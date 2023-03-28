// import React, {Component, ComponentType} from "react";
//
// export function withSuspense<WC>(Component: ComponentType<WC>) {
//     return (props: WC) => {
//         return <React.Suspense fallback={<div>Loading...</div>}>
//             <Component {...props}/>
//         </React.Suspense>
//     }
// }

import React, {Component} from "react";

export const withSuspense = (Component) => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Component/>
        </React.Suspense>
    );
}