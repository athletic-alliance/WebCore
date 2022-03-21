import { components } from 'react-select'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValueContainer = ({ ...rest }: any): JSX.Element => (
    <div className="pl-1 text-sm">
        <components.ValueContainer {...rest} />
    </div>
)
