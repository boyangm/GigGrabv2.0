import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import {Consumer} from './gigcontext'
import GigsEmployed from './gigsemployed'
import GigsEmploying from './gigsemploying'


const Activity = (props) =>{
    const {match} = props;
    return(
      <div className="activityCont">
        <ul>
            <li><NavLink to = {`${match.url}/employed`}>Gigs employed</NavLink> </li>
            <li><NavLink to = {`${match.url}/employing`}>Gigs employing</NavLink> </li>
        </ul>
        <Route exact path={match.path} render = {() => <Redirect to ={`${match.path}/employed`}/>}/>
        <Route path= {`${match.path}/employed`} component = {GigsEmployed}/>
        <Route path= {`${match.path}/employing`} component = {GigsEmploying}/>
      </div>
    )
}
export default Activity