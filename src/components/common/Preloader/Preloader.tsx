import React from 'react';
import preloader from './../../../assets/images/Pre-loading.svg'

export const Preloader: React.FC = () => {
    return (
        <div style={{backgroundColor: "darkgray"}}>
            <img src={preloader}/>
        </div>
    );
};

