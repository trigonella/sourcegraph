import {dataOrThrowErrors, gql} from '../../../../../shared/src/graphql/graphql'
import {requestGraphQL} from '../../../backend/graphql'
import {
  CloseCampaignResult,
  CloseCampaignVariables
} from '../../../graphql-operations'

export async function closeCampaign(
    {campaign, closeChangesets}: CloseCampaignVariables): Promise<void> {
  const result =
      await requestGraphQL<CloseCampaignResult, CloseCampaignVariables>(
          gql`
            mutation CloseCampaign($campaign: ID!, $closeChangesets: Boolean) {
                closeCampaign(campaign: $campaign, closeChangesets: $closeChangesets) {
                    id
                }
            }
        `,
          {campaign, closeChangesets})
          .toPromise()
  dataOrThrowErrors(result)
}
