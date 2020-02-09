import React from 'react';
import {Consumer} from './gigcontext'
import {Link} from 'react-router-dom'
import GigCard from './gigcard'

// Maps through all of the local user gigs  that are employed and makes gig cards.
const GigsEmployed = (props) => {

        return(
            <Consumer>
                { context =>
                    context.state.isAuth 
                    ?(
                        <div className = 'activityBoard'>
                        {context.state.localUser.gigsEmployed.map(gig =>
                          <GigCard key = {gig} data={gig} userId = {context.state.localUser._id} method = 'gigsEmployed'></GigCard>
                        
                        )}
    
                        </div>
                    )
                    : props.history.push('/landing')
    
                }
            </Consumer>
        )
    
}

export default GigsEmployed