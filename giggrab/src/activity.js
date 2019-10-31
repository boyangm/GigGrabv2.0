import React, {Component} from 'react';
import {Consumer} from './gigcontext'
import {Link} from 'react-router-dom'
import GigCard from './gigcard'
class Activity extends Component{
    state ={
        gigs: []
    }


    fetchOneGig = (id) => {
        fetch(`api/gigs/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState( prevState =>({ gigs: [...prevState,data] }))
                console.log(this.state.viewgig);
                return data;
            })
    }

    render(){
          
        return(
            <Consumer>
                { context =>
                    (context.state.isAuth = 'true' && context.state.localUser)
                    ?(
                        <div className = 'activityBoard'>
                        {context.state.localUser.gigsEmployed.map(gig =>
                          <GigCard key = {gig._id} data={gig}></GigCard>
                        
                        )}
    
                        </div>
                    )
                    : this.props.history.push('/login')
    
                }
            </Consumer>
        )
    }
}

export default Activity 