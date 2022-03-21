import { components, OptionProps } from 'react-select'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Option = (props: OptionProps<any>): JSX.Element => {
    return (
        <div className="text-sm">
            <components.Option {...props} />
        </div>
    )
}
