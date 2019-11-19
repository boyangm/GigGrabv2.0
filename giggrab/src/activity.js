import React ,{ useContext , useEffect} from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import {Consumer} from './gigcontext'
import GigsEmployed from './gigsemployed'
import GigsEmploying from './gigsemploying'
import{GigsContext} from './gigcontext'



const Activity = (props) =>{
  const context = useContext(GigsContext)
  const {state, actions} = context
  useEffect(() =>{
    actions.fetchOneUser(state.localUser._id)
  } , [])
    const {match} = props;
    return(
      <div className="activityCont">
        <ul>
            <li><NavLink to = {`${match.url}/employed`}>Gigs employed</NavLink> </li>
            <li><NavLink to = {`${match.url}/employing`}>Gigs employing</NavLink> </li>
        </ul>
        <Route exact path={match.path} render = {() => <Redirect to ={`${match.path}/employed`}/>}/>
        <Route path= {`${match.path}/employed`} render= {(props) =><GigsEmployed {...props}/>}/>
        <Route path= {`${match.path}/employing`} render= {(props) =><GigsEmploying {...props}/>}/>
      </div>
    )
}
export default Activity