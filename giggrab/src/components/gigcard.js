import React, { Component } from 'react'
import { Consumer } from './gigcontext'
import { Link } from 'react-router-dom'

/**
 * handles the logic of finding all the users on the gig and displaying their info and link to profile - boyang matsapola
 *
 * @class GigCard
 * @extends {Component}
 */
class GigCard extends Component {
    state = {
        gig: '0',
        players: []
    }

    // removes player from the gig
    removePlayer = (e) => {
        e.preventDefault();
        const { name } = e.target
        let newArr = this.state.players.filter(member => {
            return member._id != name
        })
        this.setState({ players: newArr })
    }

    // deletes the gig from DB
    deleteGig = (id) => {

        fetch(`/api/gigs/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    // closes the gig and removes the players from the gig on delete, or just the local player from a gig
    removeGig = (e, cb, action = 'close') => {
        e.preventDefault();
        if (action === 'delete') {
            this.state.players.map(player => {

                let gigId = this.state.gig._id;
                let action = 'pull'
                let memberId = player._id

                cb(gigId, memberId, action)
            })

            return this.deleteGig(this.state.gig._id)

        } else {
            let gigId = this.state.gig._id;
            let action = 'pull'
            let memberId = this.props.userId
            cb(gigId, memberId, action)

            return console.log('success')
        }

    }

    // fetches the gig from the DB

    fetchOneGig = (id) => {
        fetch(`/api/gigs/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ gig: data })
                if (data.gigsMates !== undefined) {
                    data.gigsMates.map(id => this.fetchOneUser(id))
                    return data;

                } else {
                    this.setState({

                        name: '?',
                        _id: '#',
                        image: 'https://electric-objects-web-production-attachments.imgix.net/artworks/preview_images/000/008/186/original/a6d8f750a88bb4abf11192012c4fdaed/Screen_Shot_2015-07-18_at_10.55.18_AM.png?ixlib=rb-0.3.5&fm=jpg&dpr=1&w=1080&h=1920&bg=000&fit=crop&lossless=false&s=1e9964ca6befb1b5972fabe342950f71',
                        instruments: ['?']

                    })
                    return data
                }
            })
    }

    //fetches the User from the DB
    fetchOneUser = (id) => {
        fetch(`/api/users/${id}`)
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
                            <button name={this.state.gig._id} onClick={(e) => this.removeGig(e, context.actions.updateGig)}>Close Gig</button>
                            {this.props.info
                                ? (
                                    <button name={this.state.gig._id} onClick={(e) => this.removeGig(e, context.actions.updateGig, 'delete')}>Delete Gig</button>

                                )
                                : null
                            }
                        </div>
                        {this.state.players.map(member => (
                            <div className='bandArea'>
                                <div className='memberSlot'>
                                    <h5 className='bandName'>{member.name}</h5>
                                    <Link to={`/users/${member._id}`}><img className='bandPic' src={member.image} /></Link>
                                    <h5 className ='bandName'>{member.instruments[0]}</h5>
                                    {
                                        this.props.info
                                            ? (
                                                <button name={member._id} onClick={this.removePlayer}>X</button>

                                            )
                                            : null
                                    }

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