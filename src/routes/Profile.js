import React from 'react';
// import { auth } from '../firebase';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth).then(() => {
      console.log('로그아웃');
      navigate('/'); // Redirect home
    }).catch((err) => {
      console.log('로그아웃 에러');
    })
  }

  return <div>
    <h1>Profile</h1>
    <button onClick={ logOut }>로그아웃</button>
  </div>;
}
