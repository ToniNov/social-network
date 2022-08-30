import React, {Component, Suspense} from 'react';
import {Preloader} from "../components/common/Preloader/Preloader";

export const withSuspense = (Component:React.FC) =>{

    function ComponentWithSuspense(){
        return (
            <Suspense fallback={<Preloader/>}>
                <Component/>
            </Suspense>
        );
    }

    return <ComponentWithSuspense />;
}


