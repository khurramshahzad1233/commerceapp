import React,{Fragment,useState} from 'react';
import "./Useroption.css";
import {SpeedDial,SpeedDialAction} from "@mui/material";
import {Dashboard,Face,ExitToApp,ListAlt,Create,ShoppingCart} from "@mui/icons-material";
import {useNavigate} from "react-router-dom"
import {useAlert } from "react-alert"
import {logoutuseraction} from "../../../action/useraction";
import {useDispatch,useSelector} from "react-redux"

const Useroption = ({user}) => {
    const navigate=useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch()

    const {cartItems} =useSelector((state)=>state.cartred)

    const [open,setOpen]=useState(false);

    const options=[
        {icon:<Create/>,name:"Create Product",func:newproduct},
        {icon:<ListAlt/>,name:"My Orders", func:orders},
        {icon:<ShoppingCart 
        style={{color:cartItems.length>0?"tomato":"unset"}}
        />,name:`Cart (${cartItems.length})`,func:cart},
        {icon:<Face/>, name:"profile", func:account},
        {icon:<ExitToApp/>, name:"logout",func:logoutuser}
    ];
    if(user.role==="admin"){
        options.unshift({icon:<Dashboard/>,name:"dashboard",func:dashboard})
    };

    function dashboard(){
      navigate("/admin/dashboard")
    };
    function newproduct(){
      navigate("/admin/product/new")
    };

    function orders(){
      navigate("/order/me")
    };
    function cart(){
      navigate("/cart")
    };
    function account(){
      navigate("/account")
    };

    function logoutuser(){
      dispatch(logoutuseraction())
      alert.success("logout successfully")
    }
  return (
    <Fragment>
      <div className="useroptioncontainer">
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        open={open}
        onOpen={(e)=>setOpen(true)}
        onClose={(e)=>setOpen(false)}
        direction="down"
        icon={<img className="speedDialIcon" src={user.avatar.url?user.avatar.url:"/profile.png"} alt="Profile"/>}
        >
          {options.map((item)=>(
            <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            key={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        </SpeedDial>
      </div>
        
    </Fragment>
  )
}

export default Useroption