import React, { useEffect, useState } from 'react';
// import { auth } from '../firebase';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';

export default function Profile({userObj, refreshDisplayName }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName || 'noname');

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

  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: newDisplayName, 
    }).then(() => {
      console.log('업데이트 완료!');
      refreshDisplayName();

    }).catch((err) => {
      console.log('업데이트 오류')
    });
  }

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  }

  return <div>
    <h1>Profile</h1>
    <form onSubmit={onSubmit}>
      <input 
        type="text" 
        placeholder='Display name' 
        value={newDisplayName}
        onChange={onChange}
      />
      <input type="submit" value='프로파일 업데이트' />
    </form>
    <button onClick={ logOut }>로그아웃</button>
  </div>;
}
