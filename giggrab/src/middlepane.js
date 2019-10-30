import React from 'react'
import {Link} from 'react-router-dom'

const MiddlePane = (props) =>{
 const {data} = props;
    return(
        <div className = 'middleParent'>
                { data.map(item =>
                <div className ='middleCont'>
                <h5 className = 'middleTitle'>{item.title}</h5>
                <h5 className = 'middleAmount'>{`$${item.moneyPaid}`}</h5>
                <h5 className = 'middledate'>{item.date}</h5>
                <div className = 'buttonCont'>
                <button id = {item._id}className ='gigbutton'>View Gig!</button>
                <Link  to ={`/${item.author}`}><button className ='gigbutton' >View Profile</button></Link>

                </div>
                </div>
                )}
          

        </div>
    )
}
export default MiddlePane