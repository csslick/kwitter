import React from 'react';
import { useState } from 'react';
import { 
  auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '../firebase';


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const onChange = (e) => {
    if(e.target.name === 'email') {
      setEmail(e.target.value);
      console.log(e.target.value);
    } else if(e.target.name === 'password') {
      setPassword(e.target.value);
      console.log(e.target.value);
    }
  } 

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if(newAccount) {
        // create Account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch(err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  const signUp = (e) => {
    e.preventDefault();
    setNewAccount(prev => !prev);

  }

  return <div>
    <h1>Auth</h1>
    <form onSubmit={onSubmit}>
      <input 
        name="email" 
        type="email" 
        placeholder='Email' 
        required 
        value={email}
        onChange={onChange}
      />
      <input 
        name="password" 
        type="password" 
        placeholder='Password' 
        required
        value={password}
        onChange={onChange}
      />
      <input 
        type="submit" 
        value={ newAccount ? "회원가입" : "로그인" }
      />
    </form>
    <p>계정이 없으신가요? <a onClick={ signUp } href="#">가입하기</a></p>
    <p className="errorMsg">{error}</p>
    <div>
      <button>구글 로그인</button>
      <button>깃허브 로그인</button>
    </div>
  </div>;
}
