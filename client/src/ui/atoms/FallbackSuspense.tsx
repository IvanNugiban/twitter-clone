import React from 'react';
import IComponentWithChildren from "../../types/interfaces/IComponentWithChildren";
import Loader from "./Loader";

const FallbackSuspense = ({children} : IComponentWithChildren) => {
    return (
        <React.Suspense fallback={<Loader/>}>
            {children}
        </React.Suspense>
    );
};

export default FallbackSuspense;