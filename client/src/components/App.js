import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from './Home';
import Login from './Login';
import Messages from './Messages';
import Contacts from './Contacts';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/messages' component={Messages} />
        <Route path='/contacts' component={Contacts} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
