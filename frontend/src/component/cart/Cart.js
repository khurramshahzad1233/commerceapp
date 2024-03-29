import React,{Fragment,} from 'react'
import "./Cart.css";
import {useSelector,useDispatch} from "react-redux";

import Cartitemcard from "./Cartitemcard.js";
import { Link,useNavigate } from 'react-router-dom';
import { additemtocartaction,removeitemfromcartaction } from '../../action/cartaction.js';
import {RemoveShoppingCart} from "@mui/icons-material"
import { Typography } from '@mui/material';

const Cart = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {cartItems}=useSelector((state)=>state.cartred);

    const increaseQuantity=(id,quantity,stock)=>{
        const newqty=quantity+1;
        if(stock<=quantity){
            return;
        }
        dispatch(additemtocartaction(id,newqty));
    };

    const decreaseQuantity=(id,quantity)=>{
        const newqty=quantity-1;
        if(1>=quantity){
            return
        }
        dispatch(additemtocartaction(id,newqty));

    };

    const deleteCartItems=(id)=>{
        dispatch(removeitemfromcartaction(id));
    };
    const checkoutHandler=()=>{
       
        navigate('/login?redirect=shipping')
    };
  return (
    <Fragment>
        {cartItems.length===0?(
            <div className="emptyCart">
                <RemoveShoppingCart/>
                <Typography>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
            </div>
        ):(
            <Fragment>
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                        
                    </div>
                    {cartItems && cartItems.map((item)=>(
                        <div className="cartContainer" key={item.product}>
                            <Cartitemcard item={item} deleteCartItems={deleteCartItems}/>
                            <div className="cartInput">
                                <button
                                onClick={()=>decreaseQuantity(item.product,item.quantity)}
                                >
                                    -

                                </button>
                                <input type="number"
                                value={item.quantity}
                                readOnly
                                />
                                <button
                                onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}
                                >+</button>
                            </div>
                            <p className="cartSubtotal">
                                {`$ ${item.price*item.quantity}`}
                            </p>
                        </div>

                    ))}
                    <div className="cartGrossProfit">
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>{`$ ${cartItems.reduce(
                                (acc,item)=>acc+item.quantity*item.price,0
                            )}`}</p>

                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  );
};

export default Cart