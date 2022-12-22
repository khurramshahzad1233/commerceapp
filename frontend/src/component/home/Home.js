import React,{ Fragment,useEffect} from 'react';
import Productcard from "./Productcard";
import Metadata from '../layout/Metadata';
import {clearerror, getallproductaction} from "../../action/productaction";
import {useSelector, useDispatch} from "react-redux";
import Search from "./Search"
import "./Home.css";
import Loader from "../layout/loader/Loader";
import { useAlert } from 'react-alert';




const Home = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((State)=>State.productred)

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    }
   

    dispatch(getallproductaction())
  },[dispatch, error,alert]);
  return (
    <Fragment>
      {loading?(<Loader/>):(<Fragment>
       <Metadata title="Home Page"/> 

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
          <button>Scroll 
           
          </button>
        </a>


        
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="searchdiv"><Search/></div>
      <div className="container" id="container">
       {products && products.map((product)=><Productcard product={product} key={product._id}/>)}
       
      </div>

    </Fragment>)}
    </Fragment>
  
    

  )
}

export default Home