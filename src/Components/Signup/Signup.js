import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();
    const trimmedPhone = phone.trim();

    // Validate email format
    if (!emailRegex.test(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    firebase
    .auth()
    .createUserWithEmailAndPassword(trimmedEmail, trimmedPassword)
    .then((result) => {
      if (result.user) {
        result.user.updateProfile({ displayName: trimmedUsername }).then(() => {
          firebase
            .firestore()
            .collection('users')
            .add({
              id: result.user.uid,
              username: trimmedUsername,
              phone: trimmedPhone
            })
            .then(() => {
              history.push('/login');
            });
        });
      } else {
        // Handle case when result.user is null
        console.error('User not found');
        alert('User not found');
      }
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      alert(error.message);
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="olximage"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
