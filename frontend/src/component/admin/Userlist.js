import React,{Fragment,useEffect} from 'react'
import {DataGrid} from "@mui/x-data-grid";
import "./Productlist.css"
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@mui/material"
import Metadata from "../layout/Metadata.js"
import Sidebar from "./Sidebar.js"
import {Edit,Delete} from "@mui/icons-material"
import { getalladminuseraction, clearerror,deleteuseraction } from '../../action/useraction';

const Userlist = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const {error,alluser}=useSelector((state)=>state.alladminuserred)
    const {error:deleteError, isDeleted,message}=useSelector((state)=>state.deleteuserred);

    const deleteUserHandler=(id)=>{
        dispatch(deleteuseraction(id));
    };

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearerror())
        }
        if(isDeleted){
            alert.success(message);
            dispatch({type:"DELETE_USER_RESET"})
            navigate("/admin/user/all");
        }
        dispatch(getalladminuseraction());
    },[dispatch,alert,error,deleteError,navigate,isDeleted,message]);

    const columns=[
        {
            field:"id",
            headerName:"User ID",
            minWidth:180,
            flex:0.8,
        },
        {
            field:"email",
            headerName:"Email",
            minWidth:150,
            flex:0.5,
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.5,
        },
        {
            field:"role",
            headerName:"Role",
            type:"number",
            minWidth:150,
            flex:0.3,
            cellClassName:(params)=>{
                return (params.row.role)==="admin"?"greenColor":"redColor";
            }

        },
        {
            field:"actions",
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/user/role/${(params.row.id)}`}><Edit/></Link>
                        <Button onClick={()=>deleteUserHandler((params.row.id))}><Delete/></Button>
                    </Fragment>
                );
            },
        },
    ];
    const rows=[];
    alluser && alluser.forEach((item)=>{
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,
        });
    });
  return (
    <Fragment>
        <Metadata title={`ALL USERS -ADMIN`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
                />
            </div>
        </div>
    </Fragment>
  );
};

export default Userlist