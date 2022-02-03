import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]); // 읽어온 글
  // db에서 글 읽음
  const getSweets = async () => {
    const querySnapshot = await getDocs(collection(db, "sweets"));
    const arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      console.log(doc.id);
      const obj = {...doc.data()}
      console.log('obj = ', obj)
    });

  }

  useEffect(() => {
    getSweets();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "sweets"), {
        sweet,
        createdAt: Date.now(),
      });
      setSweet('');
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log('submit');
  }

  const onChange = e => {
    setSweet(e.target.value);
    console.log(sweet);
  }

  return <div>
    <h1>Home</h1>
    <form onSubmit={onSubmit}>
      <input 
        type="text" 
        placeholder='오늘은 무슨일이 있었나요?'
        maxLength={120}
        value={sweet}
        onChange={onChange}
      />
      <input 
        type="submit" 
        value="Sweet" 
      />
    </form>
  </div>
}
