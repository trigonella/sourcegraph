import * as H from 'history'
import { storiesOf } from '@storybook/react'
import { radios } from '@storybook/addon-knobs'
import React from 'react'
import webStyles from '../../../enterprise.scss'
import { Tooltip } from '../../../components/tooltip/Tooltip'
import { CampaignDetails } from './CampaignDetails'
import { NOOP_TELEMETRY_SERVICE } from '../../../../../shared/src/telemetry/telemetryService'
import { of } from 'rxjs'
import { subDays, addHours } from 'date-fns/esm'
import {
    ChangesetFields,
    ChangesetExternalState,
    ChangesetReconcilerState,
    ChangesetPublicationState,
    ChangesetCheckState,
    ChangesetReviewState,
} from '../../../graphql-operations'

const { add } = storiesOf('web/campaigns/CampaignDetails', module).addDecorator(story => {
    const theme = radios('Theme', { Light: 'light', Dark: 'dark' }, 'light')
    document.body.classList.toggle('theme-light', theme === 'light')
    document.body.classList.toggle('theme-dark', theme === 'dark')
    return (
        <>
            <Tooltip />
            <style>{webStyles}</style>
            <div className="p-3 container">{story()}</div>
        </>
    )
})

add('Campaign', () => {
    const history = H.createMemoryHistory({ initialEntries: [window.location.href] })
    const now = new Date()
    const nodes: ChangesetFields[] = [
        ...Object.values(ChangesetExternalState).map(
            (externalState): ChangesetFields => ({
                __typename: 'ExternalChangeset' as const,
                id: 'somechangeset',
                updatedAt: now.toISOString(),
                nextSyncAt: addHours(now, 1).toISOString(),
                externalState,
                title: 'Changeset title on code host',
                reconcilerState: ChangesetReconcilerState.COMPLETED,
                publicationState: ChangesetPublicationState.PUBLISHED,
                body: 'This changeset does the following things:\nIs awesome\nIs useful',
                checkState: ChangesetCheckState.PENDING,
                createdAt: now.toISOString(),
                externalID: '123',
                externalURL: {
                    url: 'http://test.test/pr/123',
                },
                diffStat: {
                    added: 10,
                    changed: 20,
                    deleted: 8,
                },
                labels: [],
                repository: {
                    id: 'repoid',
                    name: 'github.com/sourcegraph/sourcegraph',
                    url: 'http://test.test/sourcegraph/sourcegraph',
                },
                reviewState: ChangesetReviewState.COMMENTED,
            })
        ),
        ...Object.values(ChangesetExternalState).map(
            (externalState): ChangesetFields => ({
                __typename: 'HiddenExternalChangeset' as const,
                id: 'somechangeset',
                updatedAt: now.toISOString(),
                nextSyncAt: addHours(now, 1).toISOString(),
                externalState,
                createdAt: now.toISOString(),
                reconcilerState: ChangesetReconcilerState.COMPLETED,
                publicationState: ChangesetPublicationState.PUBLISHED,
            })
        ),
    ]
    return (
        <CampaignDetails
            campaignID="c"
            history={history}
            location={history.location}
            isLightTheme={true}
            extensionsController={undefined as any}
            platformContext={undefined as any}
            telemetryService={NOOP_TELEMETRY_SERVICE}
            _fetchCampaignById={() =>
                of({
                    __typename: 'Campaign',
                    id: 'c',
                    name: 'awesome-campaign',
                    description: '## What this does\n\nVery good changes to all your great repositories.',
                    author: { username: 'alice', avatarURL: '/test.png' },
                    changesets: {
                        totalCount: 100,
                        stats: { total: 100, closed: 10, merged: 33, open: 47, unpublished: 10 },
                    },
                    changesetCountsOverTime: [
                        {
                            total: 100,
                            closed: 10,
                            merged: 33,
                            openApproved: 30,
                            openPending: 17,
                            openChangesRequested: 0,
                            date: subDays(new Date(), 1).toISOString(),
                        },
                        {
                            total: 100,
                            closed: 10,
                            merged: 33,
                            openApproved: 30,
                            openPending: 17,
                            openChangesRequested: 0,
                            date: subDays(new Date(), 0).toISOString(),
                        },
                    ],
                    viewerCanAdminister: true,
                    hasUnpublishedPatches: false,
                    branch: 'awesome-branch',
                    createdAt: '2020-01-01',
                    updatedAt: '2020-01-01',
                    closedAt: null,
                    namespace: {
                        namespaceName: 'alice',
                    },
                    diffStat: {
                        added: 5,
                        changed: 3,
                        deleted: 2,
                    },
                })
            }
            _queryChangesets={() => of({ totalCount: nodes.length, nodes })}
        />
    )
})
