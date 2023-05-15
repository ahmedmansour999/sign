import React, { useEffect, useState } from 'react';
import { auth , signInWithPopup, GoogleAuthProvider } from './firebaseConfige';
import { RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import "./style.css"





const LogIn = ({setUserData}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [phoneNumber ,setPhoneNumber] = useState("")
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

  //  Google Account Access 
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUserData(result.user);
      navigate("/welcome");
    } catch (error) {
      setError(error.message);
    }
  };
  //  Google Account Access 
  
  const handleSignUp = () => {
    navigate("/signup");
  }


  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // You might want to call your signIn function here
      }
    }, auth);
  }, []);

  const onSignInSubmit = (event) => {
    event.preventDefault();

    const FullphoneNumber = "+1" + phoneNumber; // Make sure to use the full phone number, including the country code
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, FullphoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            // The SMS has been sent! Prompt the user to type in the code
            var code = window.prompt("Please enter the verification code that was sent to your mobile device.");
            return confirmationResult.confirm(code);
        })
        .then((result) => {
            // User signed in successfully.
            const user = result.user;
            setUserData(user);
            navigate('/welcome');
        })
        .catch((error) => {
            // Error; SMS not sent
            console.error('Error during signInWithPhoneNumber', error);
            window.alert('Error during signInWithPhoneNumber:\n\n'
                + error.code + '\n\n' + error.message);
        });
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
        <form onSubmit={onSignInSubmit}>
    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
    <button type="submit" id="sign-in-button">Sign In with Phone Number</button>
</form>

        <button type="submit">LogIn</button>
        <button type="button" onClick={handleSignUp} >SignUp</button>
        <button type="button" id='google' onClick={handleGoogleSignIn}>Sign in with Google</button>

      

      </form>
    </div>
  );
};

export default LogIn;








