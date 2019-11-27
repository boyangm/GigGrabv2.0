import React, { Component, useState } from 'react'
import { getJwt } from '../helpers/jwt'
import { Redirect } from 'react-router-dom'


export const GigsContext = React.createContext();

/**
 *
 * storing all of the application state - boyang matsapola
 * @export
 * @class Provider
 * @extends {Component}
 */
export class Provider extends Component {

    state = {
        users: [],
        localUser: undefined,
        users: [],
        data: this.data,
        isAuth: undefined,
        gigs: [],
        viewgig: '',
        profile: {}

    }

    // grabs all the users from DB
    fetchUsers = () => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                if (!data) return
                return this.setState({ users: data })
            })
            .catch(err => {

                console.log(err)
                //this.props.history.push('/login')
            })

    }


    // grabs all the gigs from the  DB
    fetchGigs = () => {
        fetch('/api/gigs')
            .then(res => res.json())
            .then(data => {

                return this.setState({ gigs: data })
            })
            .catch(err => {

                console.log(err)
                // this.props.history.push('/login')
            })

    }

    fetchOneUser = (id) => {
        fetch(`/api//users/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data._id === this.state.localUser._id) {

                    localStorage.setItem('token', JSON.stringify(data))
                    this.setState({ localUser: data })
                } else {

                    this.setState({ profile: data });
                }
            })
    }

    // fetches one gig from the DB
    fetchOneGig = (id) => {
        fetch(`api/gigs/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ viewgig: data })

                return data
            })
    }

    // if there is a token in local storage auth will be true and the local user will update to what is in the token
    authLogin = (data) => {
        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {console.log('success')})
        
        .catch(err => {
            console.log(err)
        })

    }

    // formats the date
    formatDate = (date) => {
        var date = new Date(date);
        return date.toDateString();

    }

    //is authorized
    authy = () => {
        const jwt = getJwt();
        this.setState({
            isAuth: true,
            localUser: JSON.parse(jwt)
        })

        return true



    }

    // updates any information that may have changed in the local user
    refetch = () => {
        this.fetchOneUser(this.state.localUser._id)


    }

    // upstated the gig array of the user that grabs the gig
    grabgig = (id) => {
        this.updateGig(id, this.state.localUser._id, 'push')
    }


    // updates the gigmates via an action type
    updateGig = (gigId, memberId, action) => {
        const data = {
            gigId,
            memberId,
            action
        }
        fetch(`/api/gigs/${gigId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(post => {
                this.updateMember(data, gigId)


            })
            .catch(err => {
                console.log(err)
            })

    }


    // logout and reset the app
    logout = () => {
        localStorage.removeItem('token')
        this.setState({ isAuth: false })

    }


     // updates the gighosted or employed via an action type
    updateMember = (data) => {
        const { gigId, memberId, action } = data;
        fetch(`/api/users/gigs/${memberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json()
        }).then(data => {
            this.refetch()
        })
            .catch(err => {
                console.log(err)
            })

    }


    // parsed JS Web Token to check if the user exists and is authorized
    componentDidMount() {
        const jwt = getJwt();
        if (jwt) {
            this.setState({
                isAuth: true,
                localUser: JSON.parse(jwt),
            })


        } else {
            this.setState({
                localUser: undefined,

            })
        }
        this.fetchUsers();
        this.fetchGigs();

    }




    render() {
        return (
            <GigsContext.Provider value={{
                state: this.state,
                actions: {
                    login: this.authLogin,
                    fetchGigs: this.fetchGigs,
                    fetchUsers: this.fetchUsers,
                    getgig: this.fetchOneGig,
                    grabgig: this.grabgig,
                    formatDate: this.formatDate,
                    authy: this.authy,
                    logut: this.logout,
                    fetchOneUser: this.fetchOneUser,
                    updateMember: this.updateMember,
                    fetchGigs: this.fetchGigs,
                    updateGig: this.updateGig
                }

            }}>
                {this.props.children}
            </GigsContext.Provider>
        )
    }
}

export const Consumer = GigsContext.Consumer;