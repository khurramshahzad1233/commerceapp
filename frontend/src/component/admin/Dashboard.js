import React,{useEffect, Fragment} from 'react'
import { Typography } from '@mui/material'
import "./Dashboard.css"
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Metadata from '../layout/Metadata'
import Sidebar from "./Sidebar.js"
import {Doughnut, Line} from "react-chartjs-2"
import { getalladminproductaction,clearerror } from '../../action/productaction'
import { getalladminorderaction } from '../../action/orderaction'
import { getalladminuseraction } from '../../action/useraction'

import {ArcElement, Chart,Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement} from "chart.js"
Chart.register(ArcElement,Tooltip,LineElement,Legend,Title,CategoryScale,LinearScale,PointElement)




const Dashboard = () => {
    const dispatch=useDispatch();
    const {allproduct} =useSelector((state)=>state.alladminproductred);
    const {allorder} =useSelector((state)=>state.alladminorderred);
    const {alluser}=useSelector((state)=>state.alladminuserred)

    let outOfStock=0;
    allproduct && allproduct.forEach((item)=>{
      if(item.stock===0){
        outOfStock+=1;
      }
    });

    useEffect(()=>{
      
      dispatch(getalladminproductaction());
      dispatch(getalladminorderaction());
      dispatch(getalladminuseraction())

    },[dispatch]);
    let totalamount=0;
    allorder && allorder.forEach((item)=>{
      totalamount+=item.totalprice;
    })


    const lineState={
      labels:["Initial Amount","Amount Earned"],
      datasets:[
        {
          label:"TOTAL AMOUNT",
          data:[0,totalamount],
          backgroundColor:["tomato"],
          hoverBackgroundColor:["rgb(197,72,49"],
        }
      ] 
    };

    const doughnutState={
      labels:["Out of Stock", "InStock"],
      datasets:[
        {
          backgroundColor:["#00A6B4","#6800B4"],
          hoverBackgroundColor:["#4B5000","#35014F"],
          data:[outOfStock,allproduct.length-outOfStock],
        },
      ],
    };

  return (<Fragment>
    
     <div className="dashboard">
      <Metadata title="Dashboard -Admin Panel"/>
      <Sidebar/>
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br/> $ {totalamount}
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products"><p>Products</p>
          <p>{allproduct && allproduct.length}</p></Link>
          <Link to="/admin/order/all"><p>Orders</p>
          <p>{allorder && allorder.length}</p></Link>
          <Link to="/admin/user/all">
            <p>Users</p><p>{alluser && alluser.length}</p>
          </Link>
        </div>
      </div>
      <div className="lineChart">
        <Line data={lineState} />
      </div>
      <div className="doughnutChart">
        <Doughnut data={doughnutState}/>
      </div>
     </div>
     </div>
  </Fragment>
    
 
  )
}

export default Dashboard