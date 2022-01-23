import React from 'react';
import { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

export default function AppRouter({isLoggedIn}) {
  
  return <Router>
    <Switch>
      {isLoggedIn ? 
        <Route exact path="/">
          <Home />
        </Route> :
        <Route exact path="/">
          <Auth />
        </Route>
      }
    </Switch>
  </Router>;
}
