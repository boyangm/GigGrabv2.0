import React, {Component} from 'react'
import {getJwt} from './helpers/jwt'


const GigsContext = React.createContext();

export class Provider extends Component{

    state = {
        users:[],
        localUser:undefined,
        users:[],
        data: this.data,
        isAuth: false,
        gigs:[]
    }

    fetchUsers =() =>{
        fetch('/api/users')
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            return this.setState({users: data})
        })
        .catch(err =>{
        
            console.log(err)
            this.props.history.push('/login')
        })

    }
    fetchGigs =() =>{
        fetch('/api/gigs')
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            return this.setState({gigs: data})
        })
        .catch(err =>{
        
            console.log(err)
            this.props.history.push('/login')
        })

    }

    fetchOneGig = (id) =>{
        fetch('/api/gigs/:id')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
    }
    authLogin = (data) =>{
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

  

    componentDidMount(){
        const jwt = getJwt();
        if(jwt){
           this.setState({
               localUser: JSON.parse(jwt),
                isAuth: true
            })

        }else{
            this.setState({
                localUser: undefined,
                 isAuth: false
             })
        }


        this.fetchUsers();
        this.fetchGigs();
        this.setState({
            localUser: JSON.parse(jwt),
            isAuth: true

        })
    }

    render(){
        return(
            <GigsContext.Provider value = {{
                state:this.state,
                actions: {
                    login: this.authLogin,
                    fetchGigs: this.fetchGigs,
                    fetchUsers: this.fetchUsers
                }
                
                }}>
            {this.props.children}
            </GigsContext.Provider>
        )
    }
}

export const Consumer = GigsContext.Consumer;