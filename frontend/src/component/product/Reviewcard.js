import React from 'react'
import profilepng from "../../images/profilepng.png"
import { Rating } from '@mui/material';

const Reviewcard = ({review}) => {
    const options={
      size:"large",
      value:Number(review.rating),
      readOnly:true,
      precision:0.5,
        
    };
  return (
    <div className='reviewCard'>
        <img src={profilepng} alt="user" />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
    
  )
};

export default Reviewcard;
