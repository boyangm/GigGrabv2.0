import React, {Component, useContext, useEffect} from 'react'
import {GigsContext} from './gigcontext'

//empty comonent that renders a history push and logs the user out
 const Logout = (props) =>{
    const context = useContext(GigsContext);
    const {setIsAuth} = context.actions

    //calls custom setter hook to reset authorization
    const handleLogout = () =>{
        return setIsAuth(false)
    }
    useEffect(() => {
        localStorage.removeItem('token')
        handleLogout()
        props.history.push('/landing')
        
    }, [])

        return(
            <div>
            </div>
        )
    
}

export default Logout