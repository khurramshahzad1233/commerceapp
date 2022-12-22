import {createReducer} from "@reduxjs/toolkit";

const orderreducerinitialstate={
    order:{}
};
export const neworderreducer=createReducer(orderreducerinitialstate,{
    CREATE_ORDER_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    CREATE_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            order:action.payload.order,
        }
    },
    CREATE_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }

});

const myorderinitialstate={
    myorder:[]
};
export const myorderreducer=createReducer(myorderinitialstate,{
    MY_ORDER_REQUEST:(state,action)=>{
        return{
            
            loading:true,
        }
    },
    MY_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            myorder:action.payload.myorder,
        }
    },
    MY_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});

const orderdetailinitialstate={
    orderdetail:{}
};
export const orderdetailreducer=createReducer(orderdetailinitialstate,{
    ORDER_DETAIL_REQUEST:(state,action)=>{
        return{
            loading:true,
        }
    },
    ORDER_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            orderdetail:action.payload.order,
        }
    },
    ORDER_DETAIL_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,aciton)=>{
        return{
            state,
        }
    },
});


let allorderinitialstate={
    allorder:[]
}
export const alladminorderreducer=createReducer(allorderinitialstate,{
    ADMIN_ALL_ORDER_REQUEST:(state,action)=>{
        return{
            loading:true,
        }
    },
    ADMIN_ALL_ORDER_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allorder:action.payload.allorder,
            totalamount:action.payload.totalamount,
            
        }
    },
    ADMIN_ALL_ORDER_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    default:(state,action)=>{
        return{
            state
        }
    }
});


let deleteorderinitialstate={
    deleteorder:{}
};
export const deleteorderreducer=createReducer(deleteorderinitialstate,{
    DELETE_ORDER_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    DELETE_ORDER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload.success,
        }
    },
    DELETE_ORDER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    DELETE_ORDER_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});


let updateorderinitialstate={
    updateorder:{}
}
export const updateorderreducer=createReducer(updateorderinitialstate,{
    UPDATE_ORDER_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    UPDATE_ORDER_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload.success,
        }
    },
    UPDATE_ORDER_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    UPDATE_ORDER_RESET:(state,action)=>{
        return{
            ...state,
            inUpdated:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state
        }
    },
});
