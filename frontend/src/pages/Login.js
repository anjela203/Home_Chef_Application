import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login({history}) {
    const [isVisible,setIsVisible] = useState(false); 
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login,user} = useAuth();



    useEffect(()=>{
        if(user){
            history.push('/dashboard/profile')
        }
    },[user])

    const handleLogin = async ()=>{
        //login logic
        let data = {
            email,
            password
        }
        login(data);

    }

  return (
    <div className="login__formWrapper ">
    <h2 className='mb-3 text-center'>Welcome Back!</h2>
    <div className='card shadow p-3 w-25 mx-auto'>
    <form>
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
            <small className="form-text">New Member? <Link to='/register' className="primaryText">Register Here</Link></small>
           </div>
         
        </div>
      
       
        <Button disabled={!email || !password } onClick={handleLogin} variant='warning'>Login</Button>
      </form>

    </div>
</div>
  );
}

export default Login;