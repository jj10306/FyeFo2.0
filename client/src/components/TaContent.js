import React from 'react';
import { TiDelete } from 'react-icons/ti';


const TaContent = ({ name, user, removeTa, signOutTa }) => {
    let fileName = name.toLowerCase().trim().replace(/ /g, "_") + ".png";
    let imageSrc = "./images/tas/" + fileName;
    return (
        <div className={"ta-content-container"}>
            <div className="image-container">
                { user !== "General" && <TiDelete onClick={() => { //consider making distinction based on signOutMe vs signOutOther and handling logic of toast based on that
                    removeTa(name)
                    if (name === user) signOutTa(name)
                }

                } /> }
                <img src={imageSrc} />
                {/*<img src={imageSrc} onerror="this.src='./images/python_logo.png';" alt="Missing Image"/>*/}
            </div>
            <p>{name}</p>
        </div>

    );
}
export default TaContent;
//903197949