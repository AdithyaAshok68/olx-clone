import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthContext, FirebaseContext } from './store/Context';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/postContext';

function App() {
  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, [firebase, setUser]); // Add firebase and setUser as dependencies

  // Ensure user is not null before accessing displayName
  const displayName = user ? user.displayName : '';

  console.log("/// :", displayName);
  return (
    <div>
      <Post>
      <Router >
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/signup'>
          <Signup />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
        <Route path='/view'>
          <ViewPost />
        </Route>
      </Router>
      </Post>
    </div >
  );
}

export default App;
