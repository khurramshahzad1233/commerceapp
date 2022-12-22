import React,{useEffect,useState} from 'react';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import WebFont from "webfontloader"
import axios from "axios"
import Footer from "./component/layout/footer/Footer"
import Header from "./component/layout/header/Header"
import Loginsignup from './component/user/Loginsignup';
import {loaduseraction} from "./action/useraction"
import store from "./store";
import {useSelector} from "react-redux";
import Useroption from './component/layout/header/Useroption';
import Protectedroute from "./component/route/Protectedroute";
import Profile from "./component/user/Profile"
import Updateprofile from './component/user/Updateprofile';
import Updatepassword from "./component/user/Updatepassword"
import Home from './component/home/Home';
import Product from "./component/product/Product";
import Newproduct from "./component/admin/Newproduct"
import Productdetail from './component/product/Productdetail';
import Cart from "./component/cart/Cart"
import Shipping from './component/cart/Shipping';
import Confirmorder from "./component/cart/Confirmorder"
import Payment from "./component/cart/Payment"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js";
import Ordersuccess from "./component/cart/Ordersuccess";
import Myorder from "./component/order/Myorder";
import Orderdetail from "./component/order/Orderdetail"
import Dashboard from "./component/admin/Dashboard"
import Productlist from './component/admin/Productlist';
import Updateproduct from './component/admin/Updateproduct';
import Orderlist from "./component/admin/Orderlist"
import Userlist from "./component/admin/Userlist"
import Updateuserrole from "./component/admin/Updateuserrole"
import Orderstatus from "./component/admin/Orderstatus"
import Productreview from './component/admin/Productreview';
import Digitalproduct from "./component/digitalproduct/Digitalproduct"

const App = () => {

  const {isAuthenticated,user}=useSelector((state)=>state.userred)

  const [stripeapikey,setStripeapikey]=useState("");
  async function getstripeapikey(){
    const {data}=await axios.get("/api/stripeapikey");
    setStripeapikey(data.stripeapikey);
  };
  const stripePromise=loadStripe(stripeapikey);
    

  useEffect(()=>{
    WebFont.load({google:{
      families:["Roboto","Droid Sans","Chilanks","Montserrat"]
    }});

    getstripeapikey();
    store.dispatch(loaduseraction())
  },[])
  return (
    <Router>
      {isAuthenticated && <Useroption user={user}/>}

      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:keyword' element={<Home/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/products/:id' element={<Productdetail/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/digitalproducts' element={<Digitalproduct/>}/>

        <Route path='/login' element={<Loginsignup/>}/>

        <Route element={<Protectedroute/>}>
          <Route path='/account' element={<Profile/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/me/update' element={<Updateprofile/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/password/update' element={<Updatepassword/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/login/shipping' element={<Shipping/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/order/confirm' element={<Confirmorder/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/process/payment' element={<Elements stripe={stripePromise}><Payment/></Elements>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/success' element={<Ordersuccess/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/order/me' element={<Myorder/>}/>
        </Route>
        <Route element={<Protectedroute/>}>
          <Route path='/order/:id' element={<Orderdetail/>}/>
        </Route>



        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/product/new' element={<Newproduct/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/products' element={<Productlist/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/product/:id' element={<Updateproduct/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/order/all' element={<Orderlist/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/user/all' element={<Userlist/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/user/role/:id' element={<Updateuserrole/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/order/status/:id' element={<Orderstatus/>}/>
        </Route>
        <Route element={<Protectedroute isAdmin={true}/>}>
          <Route path='/admin/reviews' element={<Productreview/>}/>
        </Route>
      </Routes>

      <Footer/>
    </Router>
  )
}

export default App