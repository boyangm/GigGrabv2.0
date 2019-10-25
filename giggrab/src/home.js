import React from 'react'
import {Consumer} from './gigcontext'
import LeftPane from './leftPane';

const Home = () =>{

    return(
        <Consumer>
            {({users}) =>
                <div>
                <LeftPane data = {users[1]}></LeftPane>
                </div>
            }
        </Consumer>
        
    )
}

export default Home;