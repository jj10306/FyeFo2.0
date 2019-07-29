import React from 'react';

const Card = ( { className, title, children } ) => {
    return (
        <div className={"card-container"}>
            <h1>{title}</h1>
            <div className={"content-container " + className}>
                {children}
            </div>
        </div>
    );
}

export default Card;
