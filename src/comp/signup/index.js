import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from './firebaseConfinge';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import "./styled.css";

const SignUp = ({setUserData }) => {
  const [email, setEmail] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FirstName || !LastName) {
      setError("Please enter your first and last name.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: `${FirstName} ${LastName}` });

      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setError(null);
      setUserData( user) ;
      navigate('/login');

    } catch (error) {
     if (error.code==="auth/weak-password") {
        setError("Password should be at least 6 characters.")
     } if (error.code==="auth/email-already-in-use") {
        setError("Email is already in use.")
     } else {
      setError(error.message);

     }
    }
  };

  return (
    <div className='signup'>
      <h1>Sign Up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='namedata'>
          <input
            type="text"
            className='name'
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className='name'
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
        <button id='btn' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
