import React, { useState } from 'react'
import {
    ListboxOption,
    ListboxInput,
    ListboxButton,
    ListboxPopover,
    ListboxList,
    ListboxGroupLabel,
} from '@reach/listbox'
import classNames from 'classnames'
import { VersionContextProps } from '../../../shared/src/search/util'
import HelpCircleOutlineIcon from 'mdi-react/HelpCircleOutlineIcon'
import FlagVariantIcon from 'mdi-react/FlagVariantIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import MenuDownIcon from 'mdi-react/MenuDownIcon'
import { VersionContext } from '../schema/site.schema'

const HAS_DISMISSED_INFO_KEY = 'sg-has-dismissed-version-context-info'

interface VersionContextDropdownProps extends VersionContextProps {
    availableVersionContexts: VersionContext[] | undefined
}

export const VersionContextDropdown: React.FunctionComponent<VersionContextDropdownProps> = (
    props: VersionContextDropdownProps
) => {
    const [hasDismissedInfo, setHasDismissedInfo] = useState<boolean>(
        !!localStorage.getItem(HAS_DISMISSED_INFO_KEY) && localStorage.getItem(HAS_DISMISSED_INFO_KEY) === 'true'
    )

    const updateValue = (newValue: string): void => {
        props.setVersionContext(newValue)
    }

    const disableValue = (): void => {
        props.setVersionContext('')
    }

    if (!props.availableVersionContexts || props.availableVersionContexts.length === 0) {
        return null
    }

    const onDismissInfo = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        localStorage.setItem(HAS_DISMISSED_INFO_KEY, 'true')
        setHasDismissedInfo(true)
    }

    const showInfo = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        localStorage.setItem(HAS_DISMISSED_INFO_KEY, 'false')
        setHasDismissedInfo(false)
    }

    return (
        <>
            {props.availableVersionContexts ? (
                <div className="version-context-dropdown">
                    <ListboxInput value={props.versionContext} onChange={updateValue}>
                        {({ isExpanded }) => (
                            <>
                                <ListboxButton className="version-context-dropdown__button btn btn-secondary">
                                    <FlagVariantIcon className="icon-inline small" />
                                    <span className="version-context-dropdown__button-text ml-2 mr-1">
                                        {!props.versionContext || props.versionContext === 'default'
                                            ? 'Select context'
                                            : props.versionContext}
                                    </span>
                                    <MenuDownIcon className="icon-inline" />
                                </ListboxButton>
                                <ListboxPopover
                                    className={classNames('version-context-dropdown__popover dropdown-menu', {
                                        show: isExpanded,
                                    })}
                                >
                                    <div className="version-context-dropdown__title pl-2 mb-1">
                                        <span>Select version context</span>
                                        <button type="button" className="btn btn-icon" onClick={showInfo}>
                                            <HelpCircleOutlineIcon className="icon-inline small" />
                                        </button>
                                    </div>
                                    {!hasDismissedInfo && (
                                        <div className="version-context-dropdown__info card">
                                            <span className="font-weight-bold">About version contexts</span>
                                            <p className="mb-2">
                                                Version contexts allow you to search a set of repositories based on a
                                                hash, tag, or other interesting moment in time of multiple code bases.
                                                Your administrator can configure version contexts in the site
                                                configuration.
                                            </p>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary version-context-dropdown__info-dismiss"
                                                onClick={onDismissInfo}
                                            >
                                                Do not show this again
                                            </button>
                                        </div>
                                    )}
                                    <ListboxList className="version-context-dropdown__list">
                                        <ListboxGroupLabel
                                            disabled={true}
                                            value="title"
                                            className="version-context-dropdown__option version-context-dropdown__title"
                                        >
                                            <VersionContextInfoRow
                                                name="Name"
                                                description="Description"
                                                isActive={false}
                                                onDisableValue={disableValue}
                                            />
                                        </ListboxGroupLabel>

                                        {props.availableVersionContexts
                                            ?.filter(versionContext => versionContext.name === props.versionContext)
                                            .map(versionContext => (
                                                <ListboxOption
                                                    key={versionContext.name}
                                                    value={versionContext.name}
                                                    label={versionContext.name}
                                                    className="version-context-dropdown__option"
                                                >
                                                    <VersionContextInfoRow
                                                        name={versionContext.name}
                                                        description={versionContext.description || ''}
                                                        isActive={props.versionContext === versionContext.name}
                                                        onDisableValue={disableValue}
                                                    />
                                                </ListboxOption>
                                            ))}
                                        {props.availableVersionContexts
                                            ?.filter(versionContext => versionContext.name !== props.versionContext)
                                            .sort((a, b) => (a.name > b.name ? 1 : -1))
                                            .map(versionContext => (
                                                <ListboxOption
                                                    key={versionContext.name}
                                                    value={versionContext.name}
                                                    label={versionContext.name}
                                                    className="version-context-dropdown__option"
                                                >
                                                    <VersionContextInfoRow
                                                        name={versionContext.name}
                                                        description={versionContext.description || ''}
                                                        isActive={props.versionContext === versionContext.name}
                                                        onDisableValue={disableValue}
                                                    />
                                                </ListboxOption>
                                            ))}
                                    </ListboxList>
                                </ListboxPopover>
                            </>
                        )}
                    </ListboxInput>
                </div>
            ) : null}
        </>
    )
}

const VersionContextInfoRow: React.FunctionComponent<{
    name: string
    description: string
    isActive: boolean
    onDisableValue: () => void
}> = ({ name, description, isActive, onDisableValue }) => (
    <>
        <div>
            {isActive && (
                <button
                    type="button"
                    className="btn btn-icon"
                    onClick={onDisableValue}
                    aria-label="Disable version context"
                >
                    <CloseIcon className="icon-inline small" />
                </button>
            )}
        </div>
        <span className="version-context-dropdown__option-name">{name}</span>
        <span className="version-context-dropdown__option-description">{description}</span>
    </>
)
