import React from 'react';
import { BrowserRouter , Route, Switch, Redirect } from 'react-router-dom';
import './styles/styles.scss';
import Profile from './profile'
import Home from './home'
import Navbar from './navbar'
import Giftgig from './giftgig'
import Landing from './landing'

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route exact path = "/" render = {() => <Redirect to = "/login"/>}/>
        <Route exact path = "/signup" component = {Profile}/>
        <Route exact path = "/home" component = {Home}/>
        <Route exact path = "/giftgig" component = {Giftgig}/>
        <Route exact path = "/login" component = {Landing}/>


      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
