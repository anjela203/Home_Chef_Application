import axios from 'axios';
import { authHeader } from './authHeader';
const SERVER_URL = "http://localhost:5000/api/menus";


const createMenuItem = (data)=>{
    return axios.post(SERVER_URL+'/create',data,{headers:authHeader()});
}

const deleteMenuItem = (id)=>{
    return axios.delete(SERVER_URL+'/delete/'+id,{headers:authHeader()});
}

const updateMenuItems = (data)=>{
    return axios.put(SERVER_URL+'/update',data,{headers:authHeader()});
}

const getAllMenuItems = ()=>{
    //console.log(authHeader());
    return axios.get(SERVER_URL+'/get-all');
}

const getSingleMenuItem = (id)=>{
    //console.log(authHeader());
    return axios.get(SERVER_URL+'/get-single/'+id);
}



const MenuServices = {
   createMenuItem,
   updateMenuItems,
   deleteMenuItem,
   getAllMenuItems,
   getSingleMenuItem
}


export default MenuServices;