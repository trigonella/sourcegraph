import * as H from 'history'
import React from 'react'
import classNames from 'classnames'
import * as GQL from '../../../../../shared/src/graphql/schema'
import { CampaignChangesets } from '../detail/changesets/CampaignChangesets'
import { ThemeProps } from '../../../../../shared/src/theme'
import { TelemetryProps } from '../../../../../shared/src/telemetry/telemetryService'
import { PlatformContextProps } from '../../../../../shared/src/platform/context'
import { ExtensionsControllerProps } from '../../../../../shared/src/extensions/controller'
import { Subject, of } from 'rxjs'
import CloseIcon from 'mdi-react/CloseIcon'
import { CampaignActionsBar } from '../detail/CampaignActionsBar'
import { ChangesetFields } from '../../../graphql-operations'
import { addHours } from 'date-fns'
import { queryChangesets } from '../detail/backend'
import PlusIcon from 'mdi-react/PlusIcon'

interface Props extends ThemeProps, TelemetryProps, PlatformContextProps, ExtensionsControllerProps {
    campaignID: GQL.ID
    history: H.History
    location: H.Location
    className?: string
}

const now = new Date()
const nodes: ChangesetFields[] = [
    ...Object.values(GQL.ChangesetExternalState).map(
        (externalState): ChangesetFields => ({
            __typename: 'ExternalChangeset' as const,
            id: 'somechangeset',
            updatedAt: now.toISOString(),
            nextSyncAt: addHours(now, 1).toISOString(),
            externalState: GQL.ChangesetExternalState.OPEN,
            title: 'Changeset title on code host',
            reconcilerState: GQL.ChangesetReconcilerState.COMPLETED,
            publicationState: GQL.ChangesetPublicationState.PUBLISHED,
            body: 'This changeset does the following things:\nIs awesome\nIs useful',
            checkState: GQL.ChangesetCheckState.PENDING,
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
            reviewState: GQL.ChangesetReviewState.COMMENTED,
        })
    ),
    ...Object.values(GQL.ChangesetExternalState).map(
        (externalState): ChangesetFields => ({
            __typename: 'HiddenExternalChangeset' as const,
            id: 'somechangeset',
            updatedAt: now.toISOString(),
            nextSyncAt: addHours(now, 1).toISOString(),
            externalState: GQL.ChangesetExternalState.OPEN,
            createdAt: now.toISOString(),
            reconcilerState: GQL.ChangesetReconcilerState.COMPLETED,
            publicationState: GQL.ChangesetPublicationState.PUBLISHED,
        })
    ),
]

const queryFn: typeof queryChangesets = () =>
    of({
        totalCount: nodes.length,
        nodes,
    })

/**
 * Page that displays the actions to be taken when creating the campaign from the spec.
 */
export const CampaignPreview: React.FunctionComponent<Props> = ({
    campaignID,
    className,
    extensionsController,
    isLightTheme,
    platformContext,
    telemetryService,
    history,
    location,
}) => (
    <div className={classNames(className)}>
        <h1>awesome-campaign</h1>
        <div className="alert alert-info">
            By applying this campaign spec, a corresponding campaign will be created and all the below actions will be
            performed.
        </div>
        <CampaignChangesets
            campaignID={campaignID}
            viewerCanAdminister={false}
            changesetUpdates={new Subject()}
            campaignUpdates={new Subject()}
            history={history}
            location={location}
            isLightTheme={isLightTheme}
            extensionsController={extensionsController}
            platformContext={platformContext}
            telemetryService={telemetryService}
            onlyOpen={true}
            hideFilters={true}
            queryChangesets={queryFn}
        />
        <div>
            <button type="button" className="btn btn-primary">
                <PlusIcon className="icon-inline" /> Create campaign
            </button>
        </div>
    </div>
)
