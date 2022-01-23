import React from 'react';
import { useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const onChange = (e) => {
    if(e.target.name === 'email') {
      setEmail(e.target.value);
      console.log(email);
    } else if(e.target.name === 'password') {
      setPassword(e.target.value);
      console.log(password);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return <div>
    <h1>Auth</h1>
    <form>
      <input 
        name="email" 
        type="text" 
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
      <input type="submit" value="로그인" />
    </form>
    <div>
      <button>구글 로그인</button>
      <button>깃허브 로그인</button>
    </div>
  </div>;
}
