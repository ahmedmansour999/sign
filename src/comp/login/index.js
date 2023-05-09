import React, { useState } from 'react';
import { auth } from './firebaseConfige';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import "./style.css"


const LogIn = ({setUserData}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Update this line to get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setEmail('');
      setPassword('');
      setError(null);
      console.log(email, password);
      setUserData(user); // Call setUserData with the user object
      navigate("/welcome");
    } catch (error) {
      setError(error.message);

    }
  };

  return (
    <div className='login'>
      <h1>LogIn</h1>
      {error && <p>{"the email or your password not correct "}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className='email'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className='pass'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
};

export default LogIn;








