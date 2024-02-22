import axios from 'axios';
import { authHeader } from './authHeader';
const SERVER_URL = "http://localhost:5000/api/users";


const registerUser = (data)=>{
    return axios.post(SERVER_URL+'/register',data);
}

const registerChef = (data)=>{
    return axios.post(SERVER_URL+'/register-chef',data);
}

const loginUser = (data)=>{
    return axios.post(SERVER_URL+'/login',data);
}

const updateUser = (data)=>{
    return axios.put(SERVER_URL+'/profile',data,{headers:authHeader()});
}

const getAnalytics = ()=>{
    console.log(authHeader());
    return axios.get(SERVER_URL+'/get-analytics',{headers:authHeader()});
}



const UserServices = {
    registerUser,
    loginUser,
    updateUser,
    getAnalytics,
    registerChef
}


export default UserServices;