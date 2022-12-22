import axios from "axios";

export const getallproductaction=(keyword="",currentPage=1,price=[0,25000],ratings=0,category)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_PRODUCT_REQUEST"});

        let link=`/api/product/search?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            category &&
            category==="all"?(
                link=`/api/product/search?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            ):(
                link=`/api/product/search?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category={category}`
            )}
        

        const {data}=await axios.get(link);
        dispatch({
            type:"ALL_PRODUCT_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_PRODUCT_FAIL",
            payload:error.response.data.message
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"});
};


export const createnewproductaction=(productData)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_PRODUCT_REQUEST"});
        const config={
            headers:{"content-type":"multipart/form-data"},
        };
        const {data}=await axios.post(`/api/admin/product/create`,productData,config);
        dispatch({
            type:"NEW_PRODUCT_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"NEW_PRODUCT_FAIL",
            payload:error.response.data.message
        });
        
    }
};

export const productdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"PRODUCT_DETAIL_REQUEST"});
        const {data}=await axios.get(`/api/product/${id}`);
            
        dispatch({
            type:"PRODUCT_DETAIL_SUCCESS",
            payload:data

                
            });
        
        
    } catch (error) {
        dispatch({
            type:"PRODUCT_DETAIL_FAIL",
            payload:error.response.data.message
        })
        
    }
};


export const newreviewaction=(reviewData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"NEW_REVIEW_REQUEST"
        });
        const config={headers:{
            "content-type":"application/json"
        }};
        const {data}=await axios.put(`/api/product/review/new`,reviewData,config);

        dispatch({
            type:"NEW_REVIEW_SUCCESS",
            payload:data.success
        })
        
    } catch (error) {
        dispatch({
            type:"NEW_REVIEW_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


export const getalladminproductaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_ALL_PRODUCT_REQUEST"});
        const {data}=await axios.get("/api/admin/product/all");
        dispatch({
            type:"ADMIN_ALL_PRODUCT_SUCCESS",
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:"ADMIN_ALL_PRODUCT_FAIL",
            payload:error.response.data.message,
        });
    }
};



export const admindeleteproductaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_DELETE_PRODUCT_REQUEST"});
        const {data}=await axios.delete(`/api/admin/product/${id}`);

        dispatch({
            type:"ADMIN_DELETE_PRODUCT_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"ADMIN_DELETE_PRODUCT_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


export const adminupdateproductaction=(id,productData)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PRODUCT_REQUEST"});
        const config={
            headers:{"content-type":"multipart/form-data"},
        };
        const {data}=await axios.put(`/api/admin/product/${id}`,productData,config)

        dispatch({
            type:"UPDATE_PRODUCT_SUCCESS",
            payload:data,
        })

        
    } catch (error) {
        dispatch({
            type:"UPDATE_PRODUCT_FAIL",
            payload:error.response.data.message,
        });
        
    }
}


export const getallreviewaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_REVIEW_REQUEST"});
        const {data}=await axios.get(`/api/admin/product/review?id=${id}`);
        dispatch({
            type:"ALL_REVIEW_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"ALL_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const deletereviewaction=(reviewId,productId)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_REVIEW_REQUEST"});
        const {data}=await axios.delete(`/api/admin/product/review?id=${reviewId}&productId=${productId}`)

        dispatch({
            type:"DELETE_REVIEW_SUCCESS",
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_REVIEW_FAIL",
            payload:error.response.data.message,
        })
        
    }
}