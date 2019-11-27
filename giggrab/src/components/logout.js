import React, {Component} from 'react'

/**
 *removes token and pushes window back to login
 *
 * @class Logout
 * @extends {Component}
 */
class Logout extends Component{
componentDidMount(){
    localStorage.removeItem('token')
    this.props.history.push('/login')
}
    render(){
        return(
            <div>

            </div>
        )
    }
}

export default Logout