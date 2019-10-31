import React, {Component} from 'react';
import {Consumer} from './gigcontext'
import {Link} from 'react-router-dom'
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
                        <div>
                        {context.state.localUser.gigsEmployed.map(gig =>
                            <div>
                                <h4>{gig.title}</h4>
                                <div>
                                <button onClick = {() => context.actions.getgig(gig._id)} id = {gig._id} className ='gigbutton'>View Gig!</button>
                                </div>
                            </div>
                        
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