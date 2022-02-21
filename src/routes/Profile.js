import React, { useEffect } from 'react';
// import { auth } from '../firebase';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';

export default function Profile({userObj}) {
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

  const getMySweets = async () => {
    const docRef = collection(db, "sweets");

    // Create a query against the collection.
    const q = await query(
      docRef, 
      where('userId', '==', userObj.uid), 
      orderBy('createdAt')
    );
 
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  useEffect(()=> {
    getMySweets();
  }, [])

  return <div>
    <h1>Profile</h1>
    <button onClick={ logOut }>로그아웃</button>
  </div>;
}
