import React from "react";
import { Link } from "react-router-dom";
import "./styled.css"


const Home = () =>{
    return(
        <div className="home">
            <div className="navbar">
                <Link to="/signup"> <button>SignUp</button></Link>
                <Link to="/login" > <button>LogIn</button></Link>
            </div>
            <div className="container1">
                <img src="img/using-avif-in-react.webp" alt=""></img>
                <h1>WELCOME 


                    <br></br>
                    <span>
                        Free private messaging and calls are simple and reliable, available all over the world.
                    </span>
                </h1>
            </div>

        </div>
    )
}

export default Home ; 