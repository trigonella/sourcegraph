import * as Monaco from 'monaco-editor'
import {fromEventPattern, Observable, of} from 'rxjs'
import {
  debounceTime,
  first,
  map,
  publishReplay,
  refCount,
  share,
  switchMap,
  takeUntil
} from 'rxjs/operators'

import {
  SearchPatternType
} from '../../graphql-operations'

    interface SearchFieldProviders {
      tokens: Monaco.languages.TokensProvider
import{SearchSuggestion} from '../suggestions'

import{getCompletionItems} from './completion'
import{getDiagnostics} from './diagnostics'
import{getHoverResult} from './hover'
import{parseSearchQuery} from './parser'
import{getMonacoTokens} from './tokens'

hover: Monaco.languages.HoverProvider
completion: Monaco.languages.CompletionItemProvider
    diagnostics: Observable<Monaco.editor.IMarkerData[]>
}

/**
 * A dummy parsing state, required for the token provider.
 */
const PARSER_STATE: Monaco.languages.IState = {
    clone: () => ({ ...PARSER_STATE }),
    equals: () => false,
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const specialCharacters = ':-*]'

    /**
     * Returns the providers used by the Monaco query input to provide syntax
     * highlighting, hovers, completions and diagnostics for the Sourcegraph
     * search syntax.
     */
export function getProviders(
    searchQueries: Observable<string>,
    fetchSuggestions: (input: string) => Observable<SearchSuggestion[]>,
    options: {
        patternType: SearchPatternType
globbing: boolean
        interpretComments?: boolean
    }
): SearchFieldProviders {
    const parsedQueries = searchQueries.pipe(
        map(rawQuery => {
            const parsed = parseSearchQuery(rawQuery, options.interpretComments ?? false)
            return {
    rawQuery, parsed }
        }),
        publishReplay(1),
        refCount()
    )

            const debouncedDynamicSuggestions = searchQueries.pipe(
                debounceTime(300), switchMap(fetchSuggestions), share())

            return {
              tokens: {
                getInitialState: () => PARSER_STATE,
                tokenize : line => {
                const result = parseSearchQuery(line, options.interpretComments ?? false)
                if (result.type === 'success') {
                  return {
                    tokens: getMonacoTokens(result.token),
                        endState: PARSER_STATE,
                  }
                }
                return { endState: PARSER_STATE, tokens: [] }
                },
              },
                  hover: {
                    provideHover: (textModel, position, token) =>
                        parsedQueries
                            .pipe(first(),
                                  map(({parsed}) =>
                                          (parsed.type === 'error'
                                               ? null
                                               : getHoverResult(parsed.token,
                                                                position))),
                                  takeUntil(fromEventPattern(
                                      handler => token.onCancellationRequested(
                                          handler))))
                            .toPromise(),
                  },
                  completion: {
                    // An explicit list of trigger characters is needed for the
                    // Monaco editor to show completions.
                    triggerCharacters:
                        [
                          ...specialCharacters, ...alphabet,
                          ...alphabet.toUpperCase()
                        ],
                    provideCompletionItems: (textModel, position, context,
                                             token) =>
                        parsedQueries
                            .pipe(first(),
                                  switchMap(
                                      parsedQuery =>
                                          parsedQuery.parsed.type === 'error'
                                              ? of(null)
                                              : getCompletionItems(
                                                    parsedQuery.parsed.token,
                                                    position,
                                                    debouncedDynamicSuggestions,
                                                    options.globbing)),
                                  takeUntil(fromEventPattern(
                                      handler => token.onCancellationRequested(
                                          handler))))
                            .toPromise(),
                  },
                  diagnostics: parsedQueries.pipe(map(
                      ({parsed}) => (parsed.type === 'success'
                                         ? getDiagnostics(parsed.token,
                                                          options.patternType)
                                         : []))),
            }
}
