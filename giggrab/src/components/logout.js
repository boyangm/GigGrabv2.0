import React, {Component, useContext, useEffect} from 'react'
import {GigsContext} from './gigcontext'

 const Logout = (props) =>{
    const context = useContext(GigsContext);
    const {setIsAuth} = context.actions

    const handleLogout = () =>{
        return setIsAuth(false)
    }
    useEffect(() => {
        localStorage.removeItem('token')
        handleLogout()
        props.history.push('/login')
        
    }, [])

        return(
            <div>
            </div>
        )
    
}

export default Logout