import React, {useState} from 'react'
import Socials from './Socials'

//constant footer for the app
const Footer = () => {

    return (
        <div className = 'footer'>
            <p>© 2020 Abantu Development. All Rights Reserved</p>
            <Socials></Socials>
        </div>
    )
}

export default Footer
