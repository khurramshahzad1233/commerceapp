import {React, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';


const Productcard = ({product}) => {
  const options={
    size:"large",
    value:Number(product.ratings),
    readOnly:true,
    precision:0.5,
    
};
  return (
   <Fragment>
   <Link className='productcard' to={`/products/${product._id}`}>
    <img src={product.images[0].url} alt={product.name}/>
    <p>{product.description}</p>

    <div>
        <Rating {...options}/><span>({product.numofreview} Review)</span>
    </div>
    <div><span>{`$ ${product.price}`}</span></div>

   </Link>
   </Fragment>
  )
}

export default Productcard;