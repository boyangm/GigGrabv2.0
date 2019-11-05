import React, { Component } from 'react'
import { getJwt } from './helpers/jwt'
import {Redirect} from 'react-router-dom'


const GigsContext = React.createContext();

export class Provider extends Component {

    state = {
        users: [],
        localUser: undefined,
        users: [],
        data: this.data,
        isAuth: false,
        gigs: [],
        viewgig: '',
        
    }
    // grabs all the users from DB
    fetchUsers = () => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return this.setState({ users: data })
            })
            .catch(err => {

                console.log(err)
                this.props.history.push('/login')
            })

    }

    // grabs all the gigs from the  DB
    fetchGigs = () => {
        fetch('/api/gigs')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return this.setState({ gigs: data })
            })
            .catch(err => {

                console.log(err)
                this.props.history.push('/login')
            })

    }


    // fetches one gig from the DB
    fetchOneGig = (id) => {
        fetch(`api/gigs/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ viewgig: data })
                console.log(this.state.viewgig);
                return data;
            })
    }

    // if there is a token in local storage auth will be true and the local user will update to what is in the token
    authLogin = (data) => {
        console.log('made it')
        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })

    }
    formatDate = (date) => {
        var date = new Date(date);
        return date.toDateString();

    }

    //is suthorized
    authy = () =>{
        this.setState({isAuth: true})
        alert('made it')
        
        return true

        

    }


    grabgig = (id) => {
        const data = {
            memberId: [this.state.localUser._id],
            gigId: [id]
        }
        fetch(`api/gigs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json()
        }).then(post => {
            console.log(post);
            this.updateMember(data, id)
        })
            .catch(err => {
                console.log(err)
            })

    }
    logout = () =>{
        localStorage.removeItem('token')
        console.log('made it')
        this.setState({isAuth: false})

    }
    updateMember = (data) => {
        fetch(`api/users/gigs/${data.memberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json()
        }).then(data => {
            console.log(data);
        })
            .catch(err => {
                console.log(err)
            })

    }
    componentDidMount() {
        const jwt = getJwt();
        if (jwt) {
            this.setState({
                localUser: JSON.parse(jwt),
            })
            

        } else {
            this.setState({
                localUser: undefined,

            })
            localStorage.removeItem('token')
        }
        this.fetchUsers();
        this.fetchGigs();
        // this.setState({
        //     localUser: JSON.parse(jwt),
        //     isAuth: true

        // })
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
                    logut: this.logout
                }

            }}>
                {this.props.children}
            </GigsContext.Provider>
        )
    }
}

export const Consumer = GigsContext.Consumer;