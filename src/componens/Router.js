import React from 'react';
import { useState } from 'react';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Nav from '../componens/Nav';
import Profile from '../routes/Profile';

export default function AppRouter({isLoggedIn}) {
  
  return <Router>
    {isLoggedIn && <Nav />}
    <Routes>
      {isLoggedIn ? 
        <>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
        </> :
        <Route path="/" element={<Auth />}/>
      }
    </Routes>
  </Router>
}
