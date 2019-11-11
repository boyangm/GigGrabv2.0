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
        <Route path = "/login" component = {Landing}/>
        <Route path = "/logout" component = {Logout}/>
      
        <Route path = "/signup" component = {Profile}/>
        <Route path = "/activity" component = {Activity}/>
        <Route path = "/home" component = {Home}/>
        <Route path = "/giftgig" component = {Giftgig}/>
        <Route path = "/talentpool" component = {TalentPool}/>


      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
