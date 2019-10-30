import React from 'react'
import {Consumer} from './gigcontext'
import LeftPane from './leftPane';
import MiddlePane from './middlepane'
import RightPane from './rightpane'

const Home = (props) =>{

    return(
        <Consumer>
            {({state,actions}) =>
                state.isAuth = 'true'
                ?<div className = 'homeCont'>

                    <LeftPane   data = {state.localUser}></LeftPane>
                    <MiddlePane  data = {state.gigs} ></MiddlePane>
                    <RightPane  data ={state.viewgig}></RightPane>

                </div> 
                : props.history.push('/login')
            }
        </Consumer>
        
    )
}

export default Home;