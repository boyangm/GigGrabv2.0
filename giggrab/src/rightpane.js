import React from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from './gigcontext'

const RightPane = (props) => {
    const { data } = props;

    return (
        <Consumer>
            {context =>
                data
                    ? <div className='rightParent'>
                        <div className='rightCont'>
                            <h5 className='rightTitle'>{data.title}</h5>
                            <h5 className='rightAmount'>{`$${data.moneyPaid}`}</h5>
                            <h5 className='rightdate'>{data.date}</h5>
                            <div className='buttonCont'>
                                <button className = 'viewbutton' onClick={() => context.actions.grabgig(data._id)} id={data._id} >Grab Gig!</button>
                            </div>
                                <p>{data.description}</p>
                        </div>
                    </div>
                    : <div></div>
            }
        </Consumer>
    )
}
export default RightPane