import {configureStore} from "@reduxjs/toolkit"
import { cartreducer } from "./reducer/cartreducer";
import { alladminorderreducer, deleteorderreducer, myorderreducer, neworderreducer, orderdetailreducer, updateorderreducer } from "./reducer/orderreducer";
import { admindeleteproductreducer, adminupdateproductreducer, alladminproductreducer, allreviewreducer, deletereviewreducer, newadminproductreducer, newreviewreducer, productdetailreducer, productreducer, updateproductreducer } from "./reducer/productreducer";
import { alladminuserreducer, deleteuserreducer, updateprofilereducer, updateuserrolereducer, userdetailreducer, userreducer } from "./reducer/userreducer";
const store=configureStore({
    reducer:{
        userred:userreducer,
        updateprofilered:updateprofilereducer,
        productred:productreducer,
        newproductred:newadminproductreducer,
        productdetailred:productdetailreducer,
        newreviewred:newreviewreducer,
        cartred:cartreducer,
        neworderred:neworderreducer,
        myorderred:myorderreducer,
        orderdetailred:orderdetailreducer,
        alladminuserred:alladminuserreducer,
        alladminorderred:alladminorderreducer,
        alladminproductred:alladminproductreducer,
        admindeleteproductred:admindeleteproductreducer,
        adminupdateproductred:adminupdateproductreducer,
        deleteorderred:deleteorderreducer,
        deleteuserred:deleteuserreducer,
        updateuserrolered:updateuserrolereducer,
        userdetailred:userdetailreducer,
        updateorderred:updateorderreducer,
        allreviewred:allreviewreducer,
        deletereviewred:deletereviewreducer,


    }
});
export default store;