import React from 'react';
import { useState, useEffect } from 'react';
import { db, storage, ref, uploadString } from '../firebase'
import { collection, addDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Sweet from '../components/Sweet'; // 글
import { getDownloadURL } from 'firebase/storage';

// userObj: 사용자 객체, sweets: Doc 
export default function Home({userObj}) {
  const [sweet, setSweet] = useState('');
  const [sweets, setSweets] = useState([]); // 읽어온 글
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState(''); // 이미지명

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
    // 사진을 추가 했을때만 파일경로 추가
    let fileURL = '';
    if(fileURL != '') {
      // 업로드파일 경로지정: uid/이미지파일명
      const fileRef = ref(storage, `${userObj.uid}/${imgName}`);
      const res = await uploadString(fileRef, img, 'data_url');
      fileURL = await getDownloadURL(fileRef);
    }
    const docRef = await addDoc(collection(db, "sweets"), {
      text: sweet,
      createdAt: Date.now(),
      userId: userObj.uid,
      fileURL
    });
    setSweet('');
    setImg('');
    console.log("Document written with ID: ", docRef.id);
  }

  // 글 입력
  const onChange = e => {
    setSweet(e.target.value);
    // console.log(sweet);
    console.log('sweets = ', sweets)
  }

  // 파일선택
  const onChangeFile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // 파일 읽기
    // 파일로딩완료 이벤트
    reader.onloadend = (finished) => {
      console.log(finished);
      setImg(finished.currentTarget.result);
      console.log(e.target.files[0].name)
      setImgName(e.target.files[0].name)
    }
  }

  const onClearImg = () => {
    setImg(null);
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
        type="file" 
        accept="image/*" 
        onChange={onChangeFile}
      />
      <input 
        type="submit" 
        value="Sweet" 
      />
      {
        img && 
          <div>
            <img src={img} alt="user" width='50' height='50' />
            <button onClick={onClearImg}>이미지 삭제</button>
          </div>
      }        
    </form>
    <div>
      {
        sweets.map(sweet => {
          return (
            <Sweet 
              key={sweet.id} 
              sweet={sweet} 
              isOwner={sweet.userId == userObj.uid}
            />
          ) 
            
        })
      }
    </div>
  </div>
}
