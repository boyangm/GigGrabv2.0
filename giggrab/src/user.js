import React , {useContext, useEffect} from 'react'
import {GigsContext} from './gigcontext'


const User = ({match}) =>{
    const {id} = match.params
    const context = useContext(GigsContext)
    const {profile, isAuth} = context.state;
    const {fetchOneUser} = context.actions;
    console.log(profile)
    useEffect(()=>{
        fetchOneUser(id)
    }, [])
    return(
        
        <div>
            {isAuth
            ?<div>
                <img src = {profile.image}/>
                <h5>{profile.name}</h5>
                <h5>{profile.instrument}</h5>
                <div>
                {
                    profile.gigsEmployed !== undefined
    
                    ?<p>{`${profile.gigsEmployed.length} Gigs Grabbed`}</p>
                    :<p>0 Gigs Grabbed</p>
                }

                </div>
                <div>
                {
                    profile.gigshosted !== undefined
    
                    ?<p>{`${profile.gigsHosted.length} Gigs Gifted`}</p>
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