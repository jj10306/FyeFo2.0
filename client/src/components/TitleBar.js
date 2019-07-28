import React from 'react';

const TitleBar = (props) => {
    return (
        <div className="title-container">
            <div className="text-container">
                <h1>CS1301 Help Desk</h1>
                <h2>Average Wait Time: {isNaN(props.avgWait) ? 0 : props.avgWait}</h2>
            </div>
            <div className="logo-container">
                <img src="./images/gt-logo.png" alt="GT Logo"/>
            </div>
        </div>
    );
}

export default TitleBar;