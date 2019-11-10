import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import {Consumer} from './gigcontext'
import GigsEmployed from './gigsemployed'
import GigsEmploying from './gigsemploying'


const Activity = (props) =>{
    const {match} = props;
    return(
        <div>
        <div>
        <NavLink  to  = {`${match.url}/employed`}> Gigs Employed</NavLink>
        <NavLink  to  = {`${match.url}/employing`}> Gigs Employing</NavLink>
        </div>
        <div>
        <Route exact to = {`${match.path}/employed`} component = {GigsEmployed} />
        <Route exact to = {`${match.path}/employing`} component= {GigsEmploying} />
        <Route exact to = '/' render = {()=> <Redirect to = {`${match.path}/employed`}/>} />
        </div>
        </div>
        
    )
}
export default Activity