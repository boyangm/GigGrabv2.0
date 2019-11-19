import React, {useContext} from 'react';
import { BrowserRouter , Route, Switch, Redirect } from 'react-router-dom';
import './styles/styles.scss';
import Profile from './profile'
import Home from './home'
import Navbar from './navbar'
import Giftgig from './giftgig'
import Landing from './landing'
import TalentPool from './talentpool'
import User from './user'
import Activity from './activity'
import Logout from './logout'
import {GigsContext} from './gigcontext'
import EditProfile from './editprofile'




function App(props) {
  const context = useContext(GigsContext)
  const{localUser} = context.state;
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route exact path = "/" render = {() => <Redirect to = "/login"/>}/>
        <Route path = "/login" component = {Landing}/>
        <Route path = "/logout" component = {Logout}/>
        <Route path = "/edit" render = {(props) =><EditProfile {...props} user = {localUser}/>}/>
        <Route path = "/signup" component = {Profile}/>
        <Route path = "/activity" component = {Activity}/>
        <Route path = "/home" component = {Home}/>
        <Route path = "/giftgig" component = {Giftgig}/>
        <Route path = "/talentpool" component = {TalentPool}/>
        <Route path = "/users/:id" component = {User}/>


      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
