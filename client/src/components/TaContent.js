import React from 'react';
import { TiDelete } from 'react-icons/ti';


const TaContent = ({ name, user, removeTa, signOutTa }) => {
    let fileName = name.toLowerCase().trim().replace(/ /g, "_") + ".png";
    let imageSrc = "./images/tas/" + fileName;
    return (
        <div className={"ta-content-container"}>
            <div className="image-container">
                { user !== "General" ? 
                    <>
                    <TiDelete onClick={() => {  signOutTa(name)}}/> 
                    <img src={imageSrc} onClick={() => {  signOutTa(name)}}/>
                    </>
                :
                    <img src={imageSrc} />
                }
            </div>
            <p>{name.split(' ')[0]}</p>
        </div>

    );
}
export default TaContent;
//903197949