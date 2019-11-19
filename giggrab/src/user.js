import React , {useContext, useState, useEffect} from 'react'
import {GigsContext} from './gigcontext'


const User = ({match}) =>{
    const {id} = match.params
    const context = useContext(GigsContext)
    const {profile, isAuth} = context.state;
    const {fetchOneUser} = context.actions;
    const[localProfile, setLocalProfile] = useState({})
    console.log(profile)
    useEffect(()=>{
        fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => setLocalProfile(data))
        .catch(err => console.log(err))
    }, [])
    return(
        
        <div>
            {isAuth
            ?<div className = 'userCont'>
                <img src = {localProfile.image}/>
                <h5>{localProfile.name}</h5>
                <h5>{localProfile.instruments}</h5>
                <div>
                {
                    localProfile.gigsEmployed !== undefined
    
                    ?<p>{`${localProfile.gigsEmployed.length} Gigs Grabbed`}</p>
                    :<p>0 Gigs Grabbed</p>
                }

                </div>
                <div>
                {
                    localProfile.gigshosted !== undefined
    
                    ?<p>{`${localProfile.gigsHosted.length} Gigs Gifted`}</p>
                    :<p>0 Gigs Gifted</p>
                }

                </div>
                
            </div>
            : <div>not auth</div>
            }
        </div>
        )
}

export default User