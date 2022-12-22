import React,{Fragment,useEffect} from 'react';
import "./Productlist.css"
import {useSelector,useDispatch} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {useAlert} from "react-alert"
import Metadata from '../layout/Metadata';
import Sidebar from './Sidebar';
import { Button } from '@mui/material';
import { Edit,Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { getalladminproductaction,clearerror,admindeleteproductaction } from '../../action/productaction';
const Productlist = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const navigate=useNavigate()
  const {error,allproduct}=useSelector((state)=>state.alladminproductred);
  const {isDeleted,error:deleteerror}=useSelector((state)=>state.admindeleteproductred)

  const deleteProductHandler=(id)=>{
    dispatch(admindeleteproductaction(id));
  };


  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearerror())
    }
    if(deleteerror){
        alert.error(deleteerror);
        dispatch(clearerror());
    }
    if(isDeleted){
        alert.success("Product Deleted Successfully");
        navigate("/admin/dashboard");
        dispatch({type:"ADMIN_DELETE_PRODUCT_RESET"})
        
    }
    dispatch(getalladminproductaction())

  },[dispatch,error,alert,navigate,deleteerror,isDeleted])

  const columns=[
    {
      field:"id",
      headerName:"Product ID",
      minwidth:200,
      flex:0.5
    },
    {
      field:"name",
      headerName:"Name",
      minwidth:350,
      flex:1
    },
    {
        field:"stock",
        headerName:"Stock",
        type:"number",
        minWidth:150,
        flex:0.3,

    },
    {
      field:"price",
      headerName:"Price",
      type:"number",
      minWidth:270,
      flex:0.5,
    },
    {
      field:"action",
      flex:0.3,
      headerName:"Action",
      minWidth:150,
      type:"number",
      sortable:false,
      renderCell:( params)=>{
        return(
            <Fragment>
                <Link to={`/admin/product/${(params.row.id)}`}> <Edit/></Link>
                <Button 
                onClick={()=>deleteProductHandler((params.row.id))}
                ><Delete/></Button>
            </Fragment>
        )
      }
      
    },
  ];
  const rows=[];
  allproduct && allproduct.forEach((item)=>{
    rows.push({
        id:item._id,
        stock:item.stock,
        price:item.price,
        name:item.name,
    })
  })



  return (<Fragment>
    <Metadata title={`ALL PRODUCTS -ADMIN`}/>
    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            />
        </div>

    </div>
    
  </Fragment>
    
  )
}

export default Productlist