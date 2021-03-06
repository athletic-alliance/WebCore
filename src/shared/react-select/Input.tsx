import { components } from 'react-select'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Input = ({ type, ...rest }: any): JSX.Element => (
    <components.Input className="text-sm" {...rest} />
)
