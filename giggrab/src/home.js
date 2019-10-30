import React from 'react'
import {Consumer} from './gigcontext'
import LeftPane from './leftPane';

const Home = (props) =>{

    return(
        <Consumer>
            {({state,actions}) =>
                state.isAuth = 'true'
                ?<div>
                <LeftPane data = {state.localUser}></LeftPane>
                </div> 
                : props.history.push('/login')
            }
        </Consumer>
        
    )
}

export default Home;