import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import { Consumer } from './gigcontext';

class Landing extends Component {
        state ={
            email: '',
            password: '',
            message:''
        }
    
    handlevaluechange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(this.state)
    }
    handleSubmit = (e) =>{
       e.preventDefault();
       const data = {
           email: this.state.email,
           password: this.state.password
       }
       fetch('api/login', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(this.state)
           }).then(res => res.json())
           .then(data => {

            if (data.message){
                this.setState({message: data.message})
                console.log(data.message)

            }else{

                localStorage.setItem('token',JSON.stringify(data));   
                this.setState({
                    email: '',
                    password: '',
                    message: ''
                })  
                this.props.history.push('/home')              
                console.log(data);

            }
        })
           .catch(err => {
               console.log(err)
           })
       
        
    }
 

    render(){

        return(
            <Consumer>
            { context => 
            <div className = "landingCont">
                <h1 className = "landingTitle">GIG GRAB</h1>
                <h3 className = "landingSubTitle">WHERE MUSICIANS EARN</h3>
                <form >
                <label className = "landingLabel" for = "email"> Email:</label>
                <input name = "email" type = "text" onChange = {this.handlevaluechange} value = {this.state.email} ></input>
                <label className = "landingLabel" for = "password"> Password:</label>
                <input type = "password" name = "password" onChange = {this.handlevaluechange} value = {this.state.password}></input>
                <br></br>
                <button onClick ={this.handleSubmit}>Log In!</button>
                <Link to = "/signup"><button>Sign Up!</button> </Link>
                </form>
            </div>
            } 
            </Consumer>
        )        
    }
}

export default Landing