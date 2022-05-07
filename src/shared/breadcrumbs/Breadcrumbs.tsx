import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

export const Breadcrumbs = (): JSX.Element => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className="flex">
            {breadcrumbs.map(({ breadcrumb }) => (
                <div className="mr-2 after:content-['>']">{breadcrumb}</div>
            ))}
        </div>
    )
}
