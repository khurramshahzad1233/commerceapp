import React, { Fragment, useEffect,useState } from 'react'
import "./Product.css";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../layout/loader/Loader"
import {getallproductaction,clearerror} from "../../action/productaction";
import Productcard from "../home/Productcard";
import {useParams} from "react-router-dom";
import  Pagination  from "react-js-pagination";
import { Slider } from '@mui/material';
import {Typography} from '@mui/material';
import { useAlert } from 'react-alert';
import Metadata from "../layout/Metadata";



const categories=[
    "all",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Product = () => {
    const dispatch=useDispatch();
    const alert=useAlert()
    const [price,setPrice]=useState([0,25000])
    const [category, setCategory]=useState("")
    const [ratings,setRatings]=useState(0)
    const [currentPage, setCurrentPage]=useState(1)
    const {keyword}=useParams();
    const {products,loading,error,productcount,resultPerPage,filteredProductsCount}=useSelector((state)=>state.productred)

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    };

    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice)

    }

    

    // let count=filteredProductsCount;
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearerror())
        }
        dispatch(getallproductaction(keyword,currentPage,price,ratings,category))

    },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);

  return (
    <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
                <Metadata title="PRODUCTS ---ECOMMERCE"/>
                <h2 className='productsHeading'>Products</h2>
                <div className="products">
                    {products && products.map((product)=><Productcard key={product._id} product={product}/>)}
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    arial-valueLabelDisplay="range-slider"
                    min={0}
                    max={25000}
                    />
                    <Typography>Categories</Typography>
                    <ul className='categoryBox'>
                        {categories.map((category)=>(
                            <li className='category-link'
                            key={category}
                            onClick={()=>setCategory(category)}>
                                {category}

                            </li>
                        ))}
                    </ul>

                    <fieldset>
                        <Typography component="legend">
                            Ratings Above

                        </Typography>
                        <Slider 
                        value={ratings}
                        onChange={(e,newRating)=>{
                            setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={5}
                        />
                    </fieldset>
                </div>
                {resultPerPage<productcount &&(
                    <div className="paginationBox">
                    <Pagination 
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productcount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"  
                    firstPageText="1st"                 
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass='pageLinkActive'
                    />
                </div>
                )}

                    
                     
               

                

                

            </Fragment>
        )}
    </Fragment>
  )
}

export default Product;