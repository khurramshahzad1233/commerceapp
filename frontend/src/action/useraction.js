import axios from "axios"

export const registeruseraction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({type:"REGISTER_USER_REQUEST"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            }
        };
        const {data}=await axios.post(`/api/user/register`,userdata,config);
        dispatch({
            type:"REGISTER_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REGISTER_USER_FAIL",
            payload:error.response.data.message
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
};

export const loginuseraction=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"LOGIN_USER_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.post(`/api/user/login`,{email,password},config);
        dispatch({
            type:"LOGIN_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGIN_USER_FAIL",
            payload:error.response.data.message,
        })
    }
};

export const loaduseraction=()=>async(dispatch)=>{
    try {
        dispatch({type:"LOAD_USER_REQUEST"})
        const {data}=await axios.get(`/api/user/me`);

        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const logoutuseraction=()=>async(dispatch)=>{
    try {
        dispatch({type:"LOGOUT_USER_REQUEST"});
        const {data}=await axios.get(`/api/user/logout`);

        dispatch({
            type:"LOGOUT_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGOUT_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const updateprofileaction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PROFILE_REQUEST"})
        const config={
            headers:{
                "content-type":"multipart/form-data"
            }
            
        };
        const {data}=await axios.put(`/api/user/update`,userdata,config);

        dispatch({
            type:"UPDATE_PROFILE_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"UPDATE_PROFILE_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const updatepasswordaction=(userpasswords)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_PASSWORD_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const {data}=await axios.put(`/api/user/password/update`,userpasswords,config);

        dispatch({
            type:"UPDATE_PASSWORD_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_PASSWORD_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const getalladminuseraction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_ALL_USER_REQUEST"});
        const {data}=await axios.get(`/api/admin/user/all`);
        dispatch({
            type:"ADMIN_ALL_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ADMIN_ALL_USER_FAIL",
            payload:error.response.data.message
        });
        
    }
};


export const deleteuseraction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_USER_REQUEST"});
        const {data}=await axios.delete(`/api/admin/user/${id}`);
        dispatch({
            type:"DELETE_USER_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"DELETE_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const updateuserroleaction=(id,userData)=>async(dispatch)=>{
    try {
        dispatch({type:"UPDATE_USER_ROLE_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };
        const{data}=await axios.put(`/api/admin/user/${id}`,userData,config);
        dispatch({
            type:"UPDATE_USER_ROLE_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"UPDATE_USER_ROLE_FAIL",
            payload:error.response.data.message,
        });
        
    }
};


export const getuserdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"USER_DETAIL_REQUEST"});
        const {data}=await axios.get(`/api/admin/user/${id}`)
        dispatch({
            type:"USER_DETAIL_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"USER_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}