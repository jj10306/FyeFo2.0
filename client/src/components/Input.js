import React, {useState} from 'react';

const areEqual = (prev, next) => {
    return  prev.user === next.user; 
}

const Input =  React.memo((props) => {
    const [gtid, setGTID] = useState("");
    const handleChange = e => {
        const newGTID = e.target.value
        setGTID(e.target.value);
        if (newGTID.length >= 9) {
            props.getInfo(newGTID);
            setGTID("");
        }
    }
    return (
        <div className="input-container">
            {
                props.user === "General" ?
                    <input 
                    type="password" 
                    className="text-container"
                    onChange={handleChange}
                    value={gtid} 
                    placeholder= "Scan Buzzcard or type GTID (e.g 903721301)"
                    autoFocus
                    />
                :
                    <div className={"button-container"}>
                        <button onClick={props.handleButtonChange} value="RemoveNext">Remove Next</button>
                        <button onClick={props.handleButtonChange} value="ClearQueue">Clear Queue</button>
                        <button onClick={props.handleButtonChange} value="Exit">Exit</button>
                        {/*<button onClick={props.handleButtonChange} value={"SignOut " + props.user}>Sign Out</button>*/}
                    </div>
            }

        </div>
    );
}, areEqual);

export default Input;