import React, {useEffect, useState}from 'react';
import { NavLink } from 'react-router-dom'
import { Consumer, GigsContext } from './gigcontext'

// routes you to different parts of the app
const NavBar = () => {
    const [navState, setNavState] = useState('navbar') 
    const handleScroll =() =>{
        if(window.scrollY > 119){
            setNavState('navbar scrolled')
        }else{
          setNavState('navbar')
        }
      }

    useEffect(() =>{
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    },[])


    return (
        <Consumer>
            {context =>
                context.state.isAuth

                ?(<div className="navbar">
                <NavLink exact to="/home" className="title" >Giggrab</NavLink>
                    <div className="links" >
                        
                        <NavLink exact to='/activity' className="linkItems" >Activity</NavLink>
                        <NavLink exact to='/talentpool' className="linkItems">Talent Pool</NavLink>
                        <NavLink onClick={context.actions.logout} exact to="/logout" className="linkItems" >Logout</NavLink>
                    </div>
                </div>)
                :<div>

                </div>


            }
        </Consumer>
    )

}

export default NavBar