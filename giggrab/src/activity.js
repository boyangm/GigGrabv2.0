import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import {Consumer} from './gigcontext'
import GigsEmployed from './gigsemployed'
import GigsEmploying from './gigsemploying'


const Activity = (props) =>{
    const {match} = props;
    return(
    <Consumer>
    {
        context =>
        context.state.isAuth || context.state.localUser
        ?(
        <>
        <NavLink  to  = {`${match.url}/employed`}> Gigs Employed</NavLink>
        <NavLink  to  = {`${match.url}/employing`}> Gigs Employing</NavLink>

        <Route exact to = {`${match.path}/employed`} component= {GigsEmployed} />
        <Route exact to = {`${match.path}/employing`} component= {GigsEmploying} />
        <Route exact to = '/' render = {()=> <Redirect to = {`${match.path}/employed`}/>} />
        </>
        )
        : <Redirect to = "/login"/>

    }

    </Consumer>    
    )
}
export default Activity