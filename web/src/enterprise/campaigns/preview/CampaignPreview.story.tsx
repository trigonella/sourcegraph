import * as H from 'history'
import { storiesOf } from '@storybook/react'
import { radios } from '@storybook/addon-knobs'
import React from 'react'
import webStyles from '../../../enterprise.scss'
import { Tooltip } from '../../../components/tooltip/Tooltip'
import { CampaignPreview } from './CampaignPreview'
import { NOOP_TELEMETRY_SERVICE } from '../../../../../shared/src/telemetry/telemetryService'

let isLightTheme = true

const { add } = storiesOf('web/campaigns/CampaignPreview', module).addDecorator(story => {
    const theme = radios('Theme', { Light: 'light', Dark: 'dark' }, 'light')
    document.body.classList.toggle('theme-light', theme === 'light')
    document.body.classList.toggle('theme-dark', theme === 'dark')
    isLightTheme = theme === 'light'
    return (
        <>
            <Tooltip />
            <style>{webStyles}</style>
            <div className="p-3 container">{story()}</div>
        </>
    )
})

add('Header', () => {
    const history = H.createMemoryHistory()
    return (
        <CampaignPreview
            campaignID="123"
            history={history}
            location={history.location}
            isLightTheme={isLightTheme}
            telemetryService={NOOP_TELEMETRY_SERVICE}
            extensionsController={undefined as any}
            platformContext={undefined as any}
        />
    )
})
