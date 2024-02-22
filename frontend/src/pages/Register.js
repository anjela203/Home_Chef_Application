import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import UserServices from '../services/user.services';
import { getErrorMessage } from '../utils/getError';

function Register({history}) {
    const [isVisible,setIsVisible] = useState(false);
    const [username,setUsername] = useState(""); 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");



    const handleRegister = async ()=>{
        //register logic
        try{
            let data = {
                username,
                password,
                email
            }
            const response = await UserServices.registerUser(data);
            console.log(response.data);
            if(response.status===200){
                toast.success("Resident Registered Successfully!");
                history.push('/login')
            }
        }catch(err){
            console.log(err);
            toast.error(getErrorMessage(err));
        }
    }


    const handleRegisterChef = async ()=>{
        //register logic
        try{
          let data = {
              username,
              password,
              email
          }
          const response = await UserServices.registerChef(data);
          console.log(response.data);
          if(response.status===200){
              toast.success("Chef Registered Successfully!");
              history.push('/login')
          }
        }catch(err){
          console.log(err);
          toast.error(getErrorMessage(err));
        }
    }
  return (
    <div className="login__formWrapper ">
    <h2 className='mb-3 text-center'>Register Now!</h2>
    <div className='card shadow p-3 w-25 mx-auto'>
    <form>
    <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="e.g. johndoe" type="email" className="form-control" id="username" aria-describedby="username"/>
            
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="e.g. john@gmail.com" type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
            
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="input-group mb-3">
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type={isVisible ? "text" :"password"} className="form-control" id="password" aria-describedby="password-addon"/>
            <span style={{"cursor": "pointer"}} className="input-group-text" id="password-addon">
                <i onClick={()=>setIsVisible(prev=>!prev)} className={`fa  ${isVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i></span>
          </div>
         
          
        </div>
        <div className="d-flex justify-content-between">
          <div className="mb-3 text-center">
            <small className="form-text">Existing Member? <Link to='/login' className="primaryText">Login Here</Link></small>
           </div>
         
        </div>

        <hr/>
      
       
      <div className='d-flex justify-content-between'>
      <Button disabled={!email || !password || !username} onClick={handleRegister} variant='warning'>Register As Resident</Button>
      <Button disabled={!email || !password || !username} onClick={handleRegisterChef} variant='warning'>Register As Chef</Button>
      </div>
      </form>

    </div>
</div>
  );
}

export default Register;