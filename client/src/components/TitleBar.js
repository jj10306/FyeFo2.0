import React from 'react';

const TitleBar = (props) => {
    return (
        <div className="title-container">
            <div className="text-container">
                <h1>CS1301 Help Desk</h1>
                <h2>Avg Wait Time: 13.4 min</h2>
            </div>
            <div className="logo-container">
                <img src="./gt-logo.png" alt="GT Logo"/>
            </div>
        </div>
    );
}

export default TitleBar;