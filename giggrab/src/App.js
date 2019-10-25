import React from 'react';
import { BrowserRouter , Route, Switch, Redirect } from 'react-router-dom';
import './styles/styles.scss';
import Profile from './profile'
import Home from './home'
import Navbar from './navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route exact path = "/" render = {() => <Redirect to = "/home"/>}/>
        <Route exact path = "/profile" component = {Profile}/>
        <Route exact path = "/home" component = {Home}/>


      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
