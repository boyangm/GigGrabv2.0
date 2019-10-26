import React , {Component} from 'react'
import {Link} from 'react-router-dom';

class Landing extends Component {
    render(){

        return(
            <div className = "landingCont">
                <h1 className = "landingTitle">GIG GRAB</h1>
                <h3 className = "landingSubTitle">WHERE MUSICIANS EARN</h3>
                <form>
                <label className = "landingLabel" for = "email"> Email:</label>
                <input type = "input"></input>
                <label className = "landingLabel" for = "password"> Password:</label>
                <input type = "input"></input>
                <br></br>
                <button onClick = {this.login}>Log In!</button>
                <Link to = "/signup"><button>Sign Up!</button> </Link>
                
    
    
                </form>
            </div>
        )
    }
}

export default Landing