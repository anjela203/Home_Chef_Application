import axios from 'axios';
import { authHeader } from './authHeader';
const SERVER_URL = "http://localhost:5000/api/orders";


const createOrder = (data)=>{
    return axios.post(SERVER_URL,data,{headers:authHeader()});
}

const updateOrderItem = (data,id)=>{
    return axios.put(SERVER_URL+`/${id}`,data,{headers:authHeader()});
}

const getAllUserOrders = (userId)=>{
    //console.log(authHeader());
    return axios.get(SERVER_URL+'/user/'+userId,{headers:authHeader()});
}

const getAllOrders = ()=>{
    //console.log(authHeader());
    return axios.get(SERVER_URL,{headers:authHeader()});
}



const OrderServices = {
    createOrder,
    updateOrderItem,
    getAllUserOrders,
    getAllOrders
}


export default OrderServices;