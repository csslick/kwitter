import React, { useState } from 'react';
import { db } from '../firebase'
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function Sweet({ sweet, isOwner }) {
  // console.log('Sweet = ', sweet)
  const [edit, setEdit] = useState(false);
  const [newSweet, setNewSweet] = useState(sweet.text);

  const onDelete = async () => {
    const ok = window.confirm('글을 지울까요?');
    if(ok) {
      await deleteDoc(doc(db, "sweets", sweet.id));
      console.log('delete')
    } 
  }

  const toggleEdit = () => {
    setEdit(!edit)
    console.log(edit)
  }

  const onChange = (e) => {
    setNewSweet(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, "sweets", sweet.id);
    await updateDoc(ref, {
      text: newSweet
    });
    setEdit(false)
    console.log(sweet.text, ' -> ', newSweet)
  }

  return <div>
    {
      edit ? 
        <>
          <form onSubmit={onSubmit}>
            <input 
              placeholder="수정할 글 작성"
              type="text" required 
              value={newSweet}
              onChange={onChange}
            />
            <input type="submit" value="업데이트" />
          </form> 
          <button onClick={toggleEdit}>취소</button>
        </> :
      <div>
          <h4>{sweet.text}</h4>
          { sweet.fileURL && 
            <img src={sweet.fileURL} 
              alt='img' 
              width="50" 
              height="50" 
            /> }
          {
            isOwner && <>
              <button onClick={onDelete}>글 삭제</button>
              <button onClick={toggleEdit}>글 수정</button>
            </>
          }
      </div>
    }
  </div>
  
}
