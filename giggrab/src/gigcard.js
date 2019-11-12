import React, { Component } from 'react'
import { Consumer } from './gigcontext'
import { Link } from 'react-router-dom'

class GigCard extends Component {
    state = {
        gig: '0',
        players: []
    }

    fetchOneGig = (id) => {
        fetch(`/api/gigs/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ gig: data })
                if(data.gigsMates !== undefined){
                    data.gigsMates.map(id => this.fetchOneUser(id))
                    console.log(this.state.gig);
                    return data;

                }else{
                    this.setState({
                        
                            name: '?',
                            _id: '#',
                            image: 'https://electric-objects-web-production-attachments.imgix.net/artworks/preview_images/000/008/186/original/a6d8f750a88bb4abf11192012c4fdaed/Screen_Shot_2015-07-18_at_10.55.18_AM.png?ixlib=rb-0.3.5&fm=jpg&dpr=1&w=1080&h=1920&bg=000&fit=crop&lossless=false&s=1e9964ca6befb1b5972fabe342950f71',
                            instruments:['?'] 
                        
                    })
                    return data
                }
            })
    }

    fetchOneUser = (id) => {
        fetch(`/api//users/${id}`)
            .then(res => res.json())
            .then(data => this.setState(prevState => ({ players: [...prevState.players, data] })))
    }


    componentDidMount() {
        this.fetchOneGig(this.props.data)
    }

    render() {
        return (
            <Consumer>
                {context =>

                    <div className='activityCard'>
                        <div className='activityTitle'>
                            <h3 >{this.state.gig.title}</h3>
                            <h3 >{context.actions.formatDate(this.state.gig.date)}</h3>
                        </div>
                        {this.state.players.map(member => (
                            <div className='bandArea'>
                                <div className='memberSlot'>
                                    <h5 className='bandName'>{member.name}</h5>
                                    <Link to={`/user/${member._id}`}><img className='bandPic' src={member.image} /></Link>
                                    <h5>{member.instruments[0]}</h5>

                                </div>
                            </div>


                        ))}
                    </div>

                }
            </Consumer>

        )



    }
}


export default GigCard