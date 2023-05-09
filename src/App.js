import React, { useState } from "react";
import "./App.css"
import LogIn from "./comp/login";
import SignUp from "./comp/signup";
import {  Routes ,Route, BrowserRouter } from "react-router-dom";
import Welcome from "./comp/welcomesite";


function App() {
  const [Userdata , setUserData] = useState(null)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUp setUserData={setUserData} />} />
          <Route path="/login" element={<LogIn setUserData={setUserData} />} />
          <Route path="/welcome" element={<Welcome setUserData={setUserData?.displayName} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}



export default App;
