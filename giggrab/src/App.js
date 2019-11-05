import React from 'react';
import { BrowserRouter , Route, Switch, Redirect } from 'react-router-dom';
import './styles/styles.scss';
import Profile from './profile'
import Home from './home'
import Navbar from './navbar'
import Giftgig from './giftgig'
import Landing from './landing'
import TalentPool from './talentpool'
import Activity from './activity'
import Logout from './logout'



function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route exact path = "/" render = {() => <Redirect to = "/login"/>}/>
        <Route exact path = "/signup" component = {Profile}/>
        <Route exact path = "/activity" component = {Activity}/>
        <Route exact path = "/home" component = {Home}/>
        <Route exact path = "/giftgig" component = {Giftgig}/>
        <Route exact path = "/login" component = {Landing}/>
        <Route exact path = "/logout" component = {Logout}/>
        <Route exact path = "/talentpool" component = {TalentPool}/>


      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
