import React from 'react';
import {Consumer} from './gigcontext'
import {Link} from 'react-router-dom'
import GigCard from './gigcard'
const GigsEmployed = (props) => {
          
        return(
            <Consumer>
                { context =>
                    context.state.isAuth && context.state.localUser
                    ?(
                        <div className = 'activityBoard'>
                        {context.state.localUser.gigsEmployed.map(gig =>
                          <GigCard key = {gig._id} data={gig}></GigCard>
                        
                        )}
    
                        </div>
                    )
                    : props.history.push('/login')
    
                }
            </Consumer>
        )
    
}

export default GigsEmployed