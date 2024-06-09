import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';

export default function Signup() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user.updateProfile({ displayName: userName }).then(() => {
          return firebase.firestore().collection('users').add({
            id: result.user.uid,
            userName: userName,
            phoneNo: phoneNo
          });
        });
      })
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        setError(error.message); // Set the error message to state
        console.error('Error signing up:', error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            id="phone"
            name="phone"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
