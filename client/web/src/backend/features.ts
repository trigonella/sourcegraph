import { MaybeLoadingResult } from "@sourcegraph/codeintellify";
import { concat, from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DocumentHighlight } from "sourcegraph";

import { wrapRemoteObservable } from "../../../shared/src/api/client/api/common";
import { HoverMerged } from "../../../shared/src/api/client/types/hover";
import { ExtensionsControllerProps } from "../../../shared/src/extensions/controller";
import {
  FileSpec,
  RepoSpec,
  ResolvedRevisionSpec,
  toURIWithPath,
  UIPositionSpec
} from "../../../shared/src/util/url";

/**
 * Fetches hover information for the given location.
 *
 * @param context the location
 * @returns hover for the location
 */
export function getHover(
  context: RepoSpec & ResolvedRevisionSpec & FileSpec & UIPositionSpec,
  { extensionsController }: ExtensionsControllerProps
): Observable<MaybeLoadingResult<HoverMerged | null>> {
  return concat(
    [{ isLoading: true, result: null }],
    from(extensionsController.extHostAPI).pipe(
      switchMap(extensionHost =>
        wrapRemoteObservable(
          extensionHost.getHover({
            textDocument: {
              uri: toURIWithPath(context)
            },
            position: {
              character: context.position.character - 1,
              line: context.position.line - 1
            }
          })
        )
      )
    )
  );
}

/**
 * Fetches document highlight information for the given location.
 *
 * @param context the location
 * @returns document highlights for the location
 */
export function getDocumentHighlights(
  context: RepoSpec & ResolvedRevisionSpec & FileSpec & UIPositionSpec,
  { extensionsController }: ExtensionsControllerProps
): Observable<DocumentHighlight[]> {
  return concat(
    [[]],
    from(extensionsController.extHostAPI).pipe(
      switchMap(extensionHost =>
        wrapRemoteObservable(
          extensionHost.getDocumentHighlights({
            textDocument: {
              uri: toURIWithPath(context)
            },
            position: {
              character: context.position.character - 1,
              line: context.position.line - 1
            }
          })
        )
      )
    )
  );
}
