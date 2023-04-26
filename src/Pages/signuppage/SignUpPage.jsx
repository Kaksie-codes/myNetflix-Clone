import React, { useState } from 'react';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { setUserName } from '../../features/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './signuppage.css'

const SignUpPage = () => {
  const [formData, setformData] = useState({username: "",email:"", password:"", passwordCheck:""});
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setformData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })    
  }

  const signInUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/movie");  
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // navigate("/"); 
    });

  }
  const signUpUser = (e) => {
    if(formData.password !== formData.passwordCheck){
      alert('Passwords do not match');
    }else{
      e.preventDefault();
      dispatch(setUserName(formData.username))
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;  
        navigate("/movie");        
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      // ..
      });
    }   
}

    
  return (
    <div className="signup__page">
      <nav>
        <div className="nav__container container">
          <Link to="/">
            <Logo/> 
          </Link>          
          <button className="btn btn-rounded">Sign In</button>            
        </div> 
      </nav>     
      <div className="modal">
        {
          signUp ? (
            <h3>Sign In</h3>
          ) : (
            <h3>Sign Up</h3>
          )
        }
        
        <form>          
          {!signUp && 
              <div className="password_input">
                <input type="text" autoComplete="email" 
                maxLength="50" minLength="5" name="username" 
                onChange={handleChange} value={formData.username}
                className={formData.username !== "" ? "has-value" : ""}
                />
                <span>Username</span>
              </div> 
          }
          <div className="password_input">
              <input type="email" autoComplete="email" 
              maxLength="50" minLength="5" name="email" 
              onChange={handleChange} value={formData.email}
              className={formData.email !== "" ? "has-value" : ""}
              />
              <span>Email address</span>
          </div> 
          <div className="password_input">
              <input type="password" autoComplete="password" 
              maxLength="50" minLength="5" name="password" 
              onChange={handleChange} value={formData.password}
              className={formData.password !== "" ? "has-value" : ""}
              />
              <span>Password</span>
          </div>           
          {!signUp &&
             <div className="password_input">
                <input type="password" autoComplete="password" 
                maxLength="50" minLength="5" name="passwordCheck" 
                onChange={handleChange} value={formData.passwordCheck}
                className={formData.passwordCheck !== "" ? "has-value" : ""}
                />
                <span>Confirm Password</span>
            </div>     
          }
          {
            signUp ? (
              <button type="submit" className="button" onClick={signInUser}>Sign In</button> 
            ) : (
              <button type="submit" className="button" onClick={signUpUser}>Sign Up</button> 
            )
          }
                   
        </form>
        
        <div onClick={() => setSignUp(!signUp)}>
          {
            signUp ? (
              <p>New to netflix? <b>Sign Up Now</b></p>
            ) : (
              <p><b>already have an account</b></p>
            )
          }

          {/* {signUp && <p>New to netflix? <b>Sign Up Now</b></p>}
          {!signUp && <p><b>already have an account</b></p>} */}
        </div>        
      </div>
    </div>
  )
}

export default SignUpPage;