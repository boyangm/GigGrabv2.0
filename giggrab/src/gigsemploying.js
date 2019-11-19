import React from 'react';
import {Consumer} from './gigcontext'
import {Link} from 'react-router-dom'
import GigCard from './gigcard'
const GigsEmploying = (props) => {
          
        return(
            <Consumer>
                { context =>
                    context.state.isAuth && context.state.localUser
                    ?(
                        <div className = 'activityBoard'>
                        {context.state.localUser.gigsHosted.map(gig =>
                          <GigCard key = {gig} data={gig} userId = {context.state.localUser._id} method = 'gigsHosted' info={true}></GigCard>
                        
                        )}
    
                        </div>
                    )
                    : props.history.push('/login')
    
                }
            </Consumer>
        )
    
}

export default GigsEmploying