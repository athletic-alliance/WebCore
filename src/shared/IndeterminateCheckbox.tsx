import React, { forwardRef, useEffect } from 'react'

interface Props {
    indeterminate?: boolean
    name: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCombinedRefs = (...refs: any[]): React.MutableRefObject<any> => {
    const targetRef = React.useRef()

    React.useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                // eslint-disable-next-line no-param-reassign
                ref.current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
    ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
        const defaultRef = React.useRef(null)
        const combinedRef = useCombinedRefs(ref, defaultRef)

        useEffect(() => {
            if (combinedRef?.current) {
                combinedRef.current.indeterminate = indeterminate ?? false
            }
        }, [combinedRef, indeterminate])

        return <input type="checkbox" ref={combinedRef} {...rest} />
    }
)

export default IndeterminateCheckbox
