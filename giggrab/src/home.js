import React from 'react'
import {Consumer} from './gigcontext'
import LeftPane from './leftPane';
import MiddlePane from './middlepane'

const Home = (props) =>{

    return(
        <Consumer>
            {({state,actions}) =>
                state.isAuth = 'true'
                ?<div className = 'homeCont'>

                    <LeftPane   data = {state.localUser}></LeftPane>
                    <MiddlePane  data = {state.gigs}></MiddlePane>
                </div> 
                : props.history.push('/login')
            }
        </Consumer>
        
    )
}

export default Home;