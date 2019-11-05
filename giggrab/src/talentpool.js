import React from 'react'
import {Link} from 'react-router-dom'
import {Consumer} from './gigcontext'

const TalentPool  = (props) =>{

    return(
        <Consumer>
            {context =>
            (context.state.isAuth)
            ?(
                <div className= 'poolCont'>
                {context.state.users.map(item =>
                    <div className ='cardBody'>
                        <img className='cardImg' src={item.image}/>
                        <h3 className = 'cardTitle'>{item.name}</h3>
                        <h4 className = 'cardInstruments'>{item.instruments}</h4>
                        <Link to = {`/users/${item._id}`}><button className = 'cardLink'>View Profile</button></Link>
                    </div>
                )}

                </div>
            )
            :props.history.push('/login')
            }
        </Consumer>
    )

}

export default TalentPool