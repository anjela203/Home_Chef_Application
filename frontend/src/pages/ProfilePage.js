// ProfilePage.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/getError';
import UserServices from '../services/user.services';

function ProfilePage({history}) {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isVisible,setIsVisible] = useState(false);
  const {user,logout} = useAuth();

  useEffect(()=>{
    if(user){
      const {username,email} = user;
      setUsername(username);
      setEmail(email)
    }
    if(!user){
      history.push('/login');
    }
  },[user]);


  const handleUpdateProfile = async ()=>{
    try{
      let data = {
        username,
        email,
        password,
        prevMail:user?.email
      }
      const response = await UserServices.updateUser(data);
      console.log(response.data);
      if(response.status===200){
        toast.success("Profile Updated Successfully, Please login again to reflect changes!");
        logout();

      }
    }catch(err){
      console.log(err);
      toast.error(getErrorMessage(err));
    }


  }
  return (
    <div>
      <main className='profile__wrapper'>
        <h1>Profile</h1>
        <hr/>
       <form autoComplete='off' className='profile__form'>
          <div className="mb-3">
            <label className='form-label'>Username</label>
            <input value={username}  className='form-control' onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='e.g. johndoe' />
          </div>
          <div className="mb-3">
            <label className='form-label'>Email</label>
            <input value={email} className='form-control' onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='e.g. johndoe' />
          </div>
          <div>
          <label  className='form-label'> Password</label>
          <div className="input-group mb-3">
           
           <input autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} type={isVisible ? "text" :"password"} className="form-control" id="password" aria-describedby="password-addon"/>
           <span style={{"cursor": "pointer"}} className="input-group-text" id="password-addon">
               <i onClick={()=>setIsVisible(prev=>!prev)} className={`fa  ${isVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
         </div>
          </div>
         
          <button onClick={handleUpdateProfile} disabled={!email || !password || !username} type="button" className='btn btn-warning'>Update</button>
       </form>
      </main>
    </div>
  );
}

export default ProfilePage;
