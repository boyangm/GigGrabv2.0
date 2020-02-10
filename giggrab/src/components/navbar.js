import React, {useEffect, useState, useRef }from 'react';
import { NavLink} from 'react-router-dom'
import { Consumer, GigsContext } from './gigcontext'

// routes you to different parts of the app
const NavBar = () => {
    const [navState, setNavState] = useState('navbar') 
    const [toggleState, setToggleState] = useState('mobile')
    const navRef = useRef(null)
   
    const handleScroll =() =>{
        const media = window.matchMedia('(min-width: 768px)')
        if(media.matches){
            
            if(window.scrollY > 60){
                console.log(window.scrollY)
                setNavState('navbar scrolled')
            }else{
              setNavState('navbar')
            }
        }
      }
      const handleToggle = () =>{
            if (navState === 'navbar'){
                setNavState('navbar move')
            } else{
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

                ?(
                    <>
                <div className = 'mobile'>
                <img onClick = {handleToggle} className= 'toggle' src="https://img.icons8.com/ios-filled/50/000000/menu.png"></img>

                </div>
                    <div className={navState}>
                <NavLink  onClick = {handleToggle}exact to="/home" className="title" >Giggrab</NavLink>
                    <div className="links" >
                        
                        <NavLink  onClick = {handleToggle}exact to='/giftgig' className="linkItems" >Gift Gig</NavLink>
                        <NavLink  onClick = {handleToggle}exact to='/edit' className="linkItems" >Edit Profile</NavLink>
                        <NavLink  onClick = {handleToggle}exact to='/activity' className="linkItems" >Activity</NavLink>
                        <NavLink  onClick = {handleToggle}exact to='/talentpool' className="linkItems">Talent Pool</NavLink>
                        <NavLink onClick={context.actions.logout} exact to="/logout" className="linkItems" >Logout</NavLink>
                    </div>
                </div>
                </>
                )
                :<div>

                </div>


            }
        </Consumer>
    )

}

export default NavBar