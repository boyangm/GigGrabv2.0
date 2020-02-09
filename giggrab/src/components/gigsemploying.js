import React from 'react';
import {Consumer} from './gigcontext'
import {Link} from 'react-router-dom'
import GigCard from './gigcard'

//Maps through all of the local user gigs the user is employing and makes gig cards.
const GigsEmploying = (props) => {
          
        return(
            <Consumer>
                { context =>
                    context.state.isAuth
                    ?(
                        <div className = 'activityBoard'>
                        {context.state.localUser.gigsHosted.map(gig =>
                          <GigCard key = {gig} data={gig} userId = {context.state.localUser._id} method = 'gigsHosted' info={true}></GigCard>
                        
                        )}
    
                        </div>
                    )
                    : props.history.push('/landing')
    
                }
            </Consumer>
        )
    
}

export default GigsEmploying