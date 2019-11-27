import React , {useEffect, useContext} from 'react'
import {Consumer} from './gigcontext'
import LeftPane from './leftPane';
import MiddlePane from './middlepane'
import RightPane from './rightpane'
import {GigsContext} from './gigcontext'

// holds the user info , the gigs that are available, and the description of each gig
const Home = (props) =>{

    const context = useContext(GigsContext)
    
    useEffect(() =>{
        context.actions.fetchGigs()

    },[])

    return(
        <Consumer>
            {({state,actions}) =>
                <div>
                    {
                    state.isAuth
                    ?(<div className = 'homeCont'>
                        
                        <LeftPane data = {state.localUser}></LeftPane>
                        <MiddlePane data = {state.gigs} actions ={actions}></MiddlePane>
                        <RightPane data ={state.viewgig}></RightPane>

                    </div>)
                    : props.history.push('/login')

                    }
                </div>
            }
        </Consumer>
        
    )
}

export default Home;