
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);

function App() {

  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();


  const handelGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        setUser(user)


      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleGitSignIn = () => {

    signInWithPopup(auth, gitProvider)
      .then((result) => {
        const user = result.user
        setUser(user)
      })

      .catch((error) => {
        console.log(error)
      })
  }




  const handleSignOut = () => {

    signOut(auth)
      .then(() => {

        setUser({})
      })

      .catch(error => {
        setUser({})
      })

  }

  return (
    <div className="App">

      {
        user.uid ? <button onClick={handleSignOut}>SignOut </button> : <><button onClick={handelGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitSignIn}>Gitto Mama</button></>
      }



      <h1>Name: {user.displayName}</h1>
      <p>email : {user.email}</p>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
