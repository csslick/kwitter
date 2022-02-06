import React from 'react';

export default function Sweet({ userObj, isOwner }) {
  console.log('Sweet = ', userObj)

  return <div key={userObj.id}>
    <h4>{userObj.text}</h4>
    {
      isOwner && <>
          <button>글 삭제</button>
          <button>글 수정</button>
        </>
    }
  </div>;
}
