import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}


function App() {
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();

  const [user,setUser]=useState({})
  const handleGoogleSignIn = ()=>{
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log(user);
      setUser(user);
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage,email);
    });
  }
  const handleFbSignIn = ()=>{
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      console.log(user);
      setUser('fb user', user); 
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage,email, credential);
    });
  }
  const handleGithubSignIn = () => {
    firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      setUser(user);
      console.log('gitHub user',user);
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage,email, credential);
    });
  }

  return (
    <div className="App">
     <button onClick={handleGoogleSignIn}>Sign In with Google</button>
     <br/>
     <button onClick={handleFbSignIn}>Sign In with Facebook</button>
     <br/>
     <button onClick={handleGithubSignIn}>Sign In with GitHub</button>
     <h3>Email: {user.email}</h3>
     <p>Name: {user.displayName}</p>
     <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
