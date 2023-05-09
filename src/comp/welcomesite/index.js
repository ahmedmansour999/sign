import React from "react";



const Welcome = ({displayName}) =>{


    return (
        <div className="welcome">
            <h1>Welcome , <span>{displayName}</span></h1>
        </div>
    ) ;
} ;

export default Welcome ; 