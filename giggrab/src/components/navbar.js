import React from 'react';
import { NavLink } from 'react-router-dom'
import { Consumer } from './gigcontext'

// routes you to different parts of the app
const NavBar = () => {
    return (
        <Consumer>
            {context =>
                <div className="navbar">
                    <h3 className='title'> Giggrab</h3>
                    <div className="links" >
                        <NavLink exact to="/home" className="linkItems" >Home</NavLink>
                        <NavLink exact to='/activity' className="linkItems" >Activity</NavLink>
                        <NavLink exact to='/talentpool' className="linkItems">Talent Pool</NavLink>
                        <NavLink onClick={context.actions.logout} exact to="/logout" className="linkItems" >Logout</NavLink>
                    </div>
                </div>


            }
        </Consumer>
    )

}

export default NavBar