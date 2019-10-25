import React, {Component} from 'react'

const GigsContext = React.createContext();

export class Provider extends Component{
    state = {
        users:[],
        localUser:{},
        users:[],
    }

    fetchUsers =() =>{
        fetch('/api/users')
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            return this.setState({users: data})
        })
        .catch(err => console.log(err))

    }

    componentDidMount(){
        this.fetchUsers();

    }
    render(){
        return(
            <GigsContext.Provider value = {this.state}>
            {this.props.children}
            </GigsContext.Provider>
        )
    }
}

export const Consumer = GigsContext.Consumer;