import React, {useState} from 'react'
import Socials from './Socials'

const Footer = () => {
    const name = useInput('')
    const email = useInput('')
    const [errMessage, setErrMessage] = useState('')
    const handleSubmit = e =>{
        e.preventDefault()
        const body = {
            name: name.value,
            email: email.value
        }
    }

    return (
        <div className = 'footer'>
            <p>© 2020 Abantu Development. All Rights Reserved</p>
            <Socials></Socials>
        </div>
    )
}

export default Footer

const useInput = (initialValue) =>{
    const [value, setValue] = useState(initialValue)

   const handleValueChange = (e) =>{
       setValue(e.target.value)
   }
     return {
        value,
        onChange : handleValueChange
    }

}
