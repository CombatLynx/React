import React, {ComponentType} from 'react';
import preloaderPhoto from "../assets/images/arina_preloader.gif";

export const withSuspense = <WC extends object>(Component: ComponentType<WC>): React.FC<WC> => {
    return (props: WC) => {
        return (
            <React.Suspense fallback={<div><img src={preloaderPhoto} alt="preloader" /></div>}>
                <Component {...props} />
            </React.Suspense>
        )
    }
}