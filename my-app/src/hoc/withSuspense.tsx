import React, {ComponentType} from 'react'

export const withSuspense = <WC extends object>(Component: ComponentType<WC>): React.FC<WC> => {
    return (props: WC) => {
        return (
            <React.Suspense fallback={<div>loading...</div>}>
                <Component {...props} />
            </React.Suspense>
        )
    }
}