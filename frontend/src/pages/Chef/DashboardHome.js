import React, { useEffect, useState } from 'react'
import UserServices from '../../services/user.services';
import { getErrorMessage } from '../../utils/getError';
import { toast } from 'react-toastify';

function DashboardHome() {
    const [totalOrders,setTotalOrders] = useState(0);
    const [totalMenus,setTotalMenus] = useState(0);
    const [totalUsers,setTotalUsers] = useState(0);


    useEffect(()=>{
        let isMounted = true;
        const getAnalytics = async ()=>{
            try{
                const response = await UserServices.getAnalytics();
                console.log(response.data);
                if(response.status===200){
                    const {orders,users,menus} = response.data;
                    setTotalOrders(orders);
                    setTotalMenus(menus);
                    setTotalUsers(users);
                }
            }catch(err){
                console.log(err);
                toast.error(getErrorMessage(err));
            }
        }

        if(isMounted){
            getAnalytics();
        }

        return ()=>{
            return isMounted = false;
        }
    },[])

  return (
    <div>
        <h1>Welcome to Home Chef</h1>
        <hr/>
       <div className='d-flex justify-content-center'>
       <div className='card p-2 w-25 text-center m-2'>
            <h1>{totalOrders}</h1>
            <i className='fa fa-cart'></i>
            <h2>Orders</h2>
        </div>
        <div className='card p-2 w-25 text-center m-2'>
            <h1>{totalMenus}</h1>
            <i className='fa fa-cart'></i>
            <h2>Menu</h2>
        </div>
        <div className='card p-2 w-25 text-center m-2'>
            <h1>{totalUsers}</h1>
            <i className='fa fa-cart'></i>
            <h2>Users</h2>
        </div>
       </div>
    </div>
  )
}

export default DashboardHome