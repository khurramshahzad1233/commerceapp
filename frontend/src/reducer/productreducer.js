import {createReducer} from "@reduxjs/toolkit";

const productinitialstate={
    products:[]
}
export const productreducer=createReducer(productinitialstate,{
    ALL_PRODUCT_REQUEST:(state,action)=>{
       return {
        loading:true,
        products:[]
       }

    },
    ALL_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            products:action.payload.products,
            productcount:action.payload.productcount,
            resultPerPage:action.payload.resultperpage,
            filteredProductsCount:action.payload.filteredProductsCount

        }
    },
    ALL_PRODUCT_FAIL:(state,action)=>{
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

let newadminproductinitialstate={
    newadminproduct:{}
}
export const newadminproductreducer=createReducer(newadminproductinitialstate,{
    NEW_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    NEW_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            success:action.payload.success,
            product:action.payload.product,
        }
    },
    NEW_PRODUCT_FAIL:(state,action)=>{
        return{
            loading:false,
            error:action.payload,
        }
    },
    NEW_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
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
    }
});

let productdetailinitionalstate={
    product:{ }

}

export const productdetailreducer=createReducer(productdetailinitionalstate,{
    PRODUCT_DETAIL_REQUEST:(state,action)=>{
        return {
            loading:true,
            ...state
        }

    },
    PRODUCT_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            product:action.payload.product
            
        }
    },
    PRODUCT_DETAIL_FAIL:(state,action)=>{
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

let newreviewinitialstate={
    newreview:{}
};
export const newreviewreducer=createReducer(newreviewinitialstate,{
    NEW_REVIEW_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    NEW_REVIEW_SUCCESS:(state,action)=>{
        return{
            loading:false,
            success:action.payload.success,
        }
    },
    NEW_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    NEW_REVIEW_RESET:(state,action)=>{
        return{
            ...state,
            success:false,
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


let adminproductinitialstate={
    allproduct:[]
};
export const alladminproductreducer=createReducer(adminproductinitialstate,{
    ADMIN_ALL_PRODUCT_REQUEST:(state,action)=>{
        return{
            loading:true,
            allproduct:[]
        }
    },
    ADMIN_ALL_PRODUCT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allproduct:action.payload.allproduct,
        }
    },
    ADMIN_ALL_PRODUCT_FAIL:(state,action)=>{
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
            state,
        }
    }
});


let deleteproductinitialstate={
    deleteproduct:{}
};

export const admindeleteproductreducer=createReducer(deleteproductinitialstate,{
    ADMIN_DELETE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    ADMIN_DELETE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload.success,
        }
    },
    ADMIN_DELETE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    ADMIN_DELETE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isDeleted:false,
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
            state,
        }
    }
});


let updateproductinitialstate={
    updateproduct:{}
}
export const adminupdateproductreducer=createReducer(updateproductinitialstate,{
    UPDATE_PRODUCT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isUpdated:action.payload.success,

        }
    },
    UPDATE_PRODUCT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,

        }
    },
    UPDATE_PRODUCT_RESET:(state,action)=>{
        return{
            ...state,
            isUpdated:false,

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
            state,
        }
    }
});


let allreviewinitialstate={
    allreview:[]
}
export const allreviewreducer=createReducer(allreviewinitialstate,{
    "ALL_REVIEW_REQUEST":(state,action)=>{
        return{
            ...state,
            loading:false,
        }
    },
    ALL_REVIEW_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allreview:action.payload,
        }
    },
    ALL_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
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


let deletereviewinitialstate={
    deletereview:{}
};
export const deletereviewreducer=createReducer(deletereviewinitialstate,{
    DELETE_REVIEW_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
        }
    },
    DELETE_REVIEW_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            isDeleted:action.payload,
        }
    },
    DELETE_REVIEW_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
        }
    },
    DELETE_REVIEW_RESET:(state,action)=>{
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
            state
        }
    }

})