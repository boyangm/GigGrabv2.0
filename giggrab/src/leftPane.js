import React from 'react'


const LeftPane = (props) =>{
   const data = props.data;
   console.log(data);
   console.log(typeof data)
   console.log(JSON.stringify(data));
  return (
      <div>
          {
             data && 
             (
                 <div className = "leftCont">
                 <h3 className = "proTitle">welcome back {data.name} !</h3>
                 <img className= "profilePic" src = {data.image} alt ="profile"/>
                 <h4 className = "instruments">{data.instruments.map( item => `${item}, `)}</h4>
                 <h4 className = "rating">{data.rating.$numberDecimal}</h4>

                 </div>
             )
          }
      </div>
  )
}

export default LeftPane;