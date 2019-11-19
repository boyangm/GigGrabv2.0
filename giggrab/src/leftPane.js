import React from 'react'
import {Link} from 'react-router-dom'


const LeftPane = (props) =>{
   const data = props.data;
   console.log(data);
   console.log(typeof data)
   console.log(JSON.stringify(data));
  return (
      <div className = 'leftParent'>
          {
             data && 
             (
                 <div className = "leftCont">
                 <h3 className = "proTitle">Welcome Back {data.name}!</h3>
                 <img className= "profilePic" src = {data.image} alt ="profile"/>
                 <h4 className = "instruments">{data.instruments.map( item => `${item}, `)}</h4>
                 <h4 className = "rating">{` Rating: ${data.rating.$numberDecimal}`}</h4>
                 <div className = 'buttonCont'>
                 <Link to='/giftgig'><button className = 'gigbutton'>Gift Gig!</button></Link>
                <Link  to ={`/edit`}><button className ='gigbutton' >Edit Profile</button></Link>

                </div>

                 </div>
             )
          }
      </div>
  )
}

export default LeftPane;