import React,{Fragment,useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'
import { MailOutline, Person, VerifiedUser } from '@mui/icons-material'
import Loader from '../layout/loader/Loader'
import { getuserdetailaction, updateuserroleaction, clearerror  } from '../../action/useraction.js';
import {useParams,useNavigate} from "react-router-dom"

const Updateuserrole = () => {
    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();
    const {loading, error,userdetail}=useSelector((state)=>state.userdetailred)
    const {loading:updateloading,error:updateError, isUpdated}=useSelector((state)=>state.updateuserrolered);

    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[role,setRole]=useState("")
    const {id}=useParams();

    useEffect(()=>{
        if(userdetail && userdetail._id!==id){
            dispatch(getuserdetailaction(id));
        }else{
            setName(userdetail.name);
            setEmail(userdetail.email);
            setRole(userdetail.role);
        }
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearerror())
        }
        if(isUpdated){
            alert.success("User Updated Successfully");
            dispatch({type:"UPDATE_USER_ROLE_RESET"});
            navigate("/admin/user/all");
        }
    },[dispatch,alert,error,updateError,isUpdated,userdetail,id,navigate])
    const updateUserSubmitHandler=(e)=>{
        e.preventDefault();

        const myForm=new FormData()

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("role",role);
        dispatch(updateuserroleaction(id,myForm));
    };

  return (
    <Fragment>
        <Metadata title="Update User Role"/>
        <div className="dashboard">
            <Sidebar/>
            <div className="newProductContainer">
                {loading?(<Loader/>):(
                    <form
                    className='createProductForm'
                    onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>
                        <div>
                            <Person/>
                            <input
                            type="text"
                            placeholder='Name'
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutline/>
                            <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <VerifiedUser/>
                            <select
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                            >
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <Button
                        id="CreateProductBtn"
                        type="submit"
                        disabled={
                            updateloading?true:false||role===""?true:false
                        }
                        >Update</Button>
                    </form>
                )}
            </div>
        </div>
    </Fragment >
  );
};

export default Updateuserrole;