import React from 'react';
import { useState } from 'react';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Nav from '../components/Nav';
import Profile from '../routes/Profile';

export default function AppRouter({isLoggedIn, userObj}) {
  return <Router>
    {isLoggedIn && <Nav />}
    <Routes>
      {isLoggedIn ? 
        <>
          <Route 
            path="/" 
            element={<Home userObj={userObj}/>}
          />
          <Route 
            path="/profile" 
            element={<Profile userObj={userObj} />}
          />
        </> :
        <Route path="/" element={<Auth />}/>
      }
    </Routes>
  </Router>
}
