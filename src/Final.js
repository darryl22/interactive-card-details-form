import React from "react";
import Complete from "./images/icon-complete.svg"

function Final() {
    return(
        <div className="final">
            <img src={Complete} alt="complete"/>
            <h1 style={{marginBottom: "0px", whiteSpace: "nowrap"}}>THANK YOU!</h1>
            <p style={{color: "gray", whiteSpace: "nowrap"}}>We've added your details</p>
            <button className="submit-form">Continue</button>
        </div>
    )
}

export default Final