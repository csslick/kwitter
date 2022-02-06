import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase'
import { 
  collection, 
  addDoc, 
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function Home({userObj}) {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]); // 읽어온 글

  useEffect(() => {
    // db에서 실시간으로 글 읽음
    const q = query(collection(db, "sweets"), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArr = [];
      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,  // id(key)
          ...doc.data()
        }
        newArr.push(obj);
      });
      setSweets(newArr.reverse());
      console.log("Current data: ", newArr);
    });
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "sweets"), {
        text: sweet,
        createdAt: Date.now(),
        userId: userObj.uid
      });
      setSweet('');
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const onChange = e => {
    setSweet(e.target.value);
    // console.log(sweet);
    console.log('sweets = ', sweets)
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
    <div>
      {
        sweets.map(sweet => {
          return <div key={sweet.id}>
              <h4>{sweet.text}</h4>
            </div>
        })
      }
    </div>
  </div>
}
