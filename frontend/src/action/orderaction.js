import axios from "axios";
export const neworderaction=(order)=>async(dispatch)=>{
    try {
        dispatch({type:"CREATE_ORDER_REQUEST"});

        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.post("/api/order/new",order,config);
        

        dispatch({
            type:"CREATE_ORDER_SUCCESS", 
            payload:data,

        
        })
    } catch (error) {
        dispatch({
            type:"CREATE_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"});
};

export const myorderaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"MY_ORDER_REQUEST"});
        const {data}=await axios.get("/api/order/me");
        dispatch({
            type:"MY_ORDER_SUCCESS",
            payload:data,
        });
    } catch (error) {
        dispatch({
            type:"MY_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const getorderdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"ORDER_DETAIL_REQUEST"
        })
        const {data}=await axios.get(`/api/order/${id}`);
        dispatch({
            type:"ORDER_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        
        dispatch({
            type:"ORDER_DETAIL_FAIL",
            payload:error.response.data.message,
        });
    }

};


export const getalladminorderaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_ALL_ORDER_REQUEST"});
        const {data}=await axios.get(`/api/admin/order/all`);
        dispatch({
            type:"ADMIN_ALL_ORDER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ADMIN_ALL_ORDER_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


export const deleteorderaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_ORDER_REQUEST"});
        const {data}=await axios.delete(`/api/admin/order/${id}`);
        dispatch({
            type:"DELETE_ORDER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_ORDER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const updateorderaction=(id,order)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_ORDER_REQUEST"
        });
        const config={
            headers:{"content-type":"application/json"}
        };
        const {data}=await axios.put(`/api/admin/order/${id}`,order,config);

        dispatch({
            type:"UPDATE_REQUEST_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"UPDATE_ORDER_FAIL",
            payload:error.response.data.message,
        });
        
    }
};