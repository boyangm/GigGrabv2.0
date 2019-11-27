import React, { useContext, useEffect } from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { Consumer } from './gigcontext'
import GigsEmployed from './gigsemployed'
import GigsEmploying from './gigsemploying'
import { GigsContext } from './gigcontext'


// updates the  gigs hosted and empoloyed of the user
const Activity = (props) => {
  const context = useContext(GigsContext)
  const { state, actions, isAuth } = context
  useEffect(() => {
    actions.fetchOneUser(state.localUser._id)
  }, [])
  const { match } = props;
  return (
    <div className="activityCont">
      {
        isAuth
          ? (
            <>
              <ul>
                <li><NavLink to={`${match.url}/employed`}>Gigs employed</NavLink> </li>
                <li><NavLink to={`${match.url}/employing`}>Gigs employing</NavLink> </li>
              </ul>
              <Route exact path={match.path} render={() => <Redirect to={`${match.path}/employed`} />} />
              <Route path={`${match.path}/employed`} render={(props) => <GigsEmployed {...props} />} />
              <Route path={`${match.path}/employing`} render={(props) => <GigsEmploying {...props} />} />
            </>
          )
          : (
            props.history.push('/login')
          )
      }
    </div>
  )
}
export default Activity