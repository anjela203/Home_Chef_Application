import React, { useEffect, useState } from 'react'
import OrderServices from '../../services/orderServices';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/getError';

function AdminOrders() {
    const [orders,setOrders] = useState([]);
   
    const [filteredOrders,setFilteredOrders] = useState([]);

    const getAllOrders = async ()=>{
      try{
          const response = await OrderServices.getAllOrders();
          //console.log(response.data);
          if(response.status===200){
             
              setOrders(response.data);
          }
      }catch(err){
          console.log(err);
          toast.error(getErrorMessage(err));
      }
  }

    useEffect(()=>{
        let isMounted = true;
        const getAllOrders = async ()=>{
            try{
                const response = await OrderServices.getAllOrders();
                //console.log(response.data);
                if(response.status===200){
                   
                    setOrders(response.data);
                }
            }catch(err){
                console.log(err);
                toast.error(getErrorMessage(err));
            }
        }
    
        if(isMounted){
            getAllOrders();
        }
    
        return ()=>{
            return isMounted = false;
        }
    },[]);

    const handleSearch = (e)=>{
        let query = e.target.value;
        if(query){
            let filteredList = orders.filter((item)=>{
              return item?.title.toLowerCase().match(query.toLowerCase());
            });
            setFilteredOrders(filteredList);
        }
    }

    const handleUpdateOrderStatus = async (e,order)=>{
      let status = e.target.value;
      // console.log(e.target.value);
      // console.log(order);
      try{
        const response = await OrderServices.updateOrderItem({status},order.order_id);
        //console.log(response.data);
        if(response.status===200){
          toast.success("Order Status Updated Successfully!");
          getAllOrders();
        }
      }catch(err){
        console.log(err);
        toast.error(getErrorMessage(err));
      }
    }

  return (
    <div>
        <div className='d-flex align-items-center justify-content-between'>
        <h2>All Orders</h2>
        <input className='form-control w-50' type="search" onChange={handleSearch} placeholder='Search Order By Title here' />
        </div>
        <hr/>
        <div className='container mt-5'>
            {orders.length > 0 ? 
            <table className='table table-bordered'>
                <thead className='table-light'>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Order By</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>

                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? filteredOrders.map((item)=>{
                        return(<tr key={item?.order_id}>
                             <td>#{item?.order_id}</td>
                            <td>{item?.title}</td>
                            <td>{item?.quantity}</td>
                            <td>$ {item?.quantity*item.price}</td>
                            <td>{item.email}</td>
                            <td><span className='badge rounded-pill text-bg-warning'>{item?.orderStatus}</span></td>
                            <td>
                              <select className='form-control' onChange={(e)=>handleUpdateOrderStatus(e,item)}>
                                  <option value="Processing">Processing</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option  value="Delivered">Delivered</option>
                              </select>
                            </td>
                        </tr>)
                    }) : orders.map((item)=>{
                      return(<tr key={item?.order_id}>
                        <td>#{item?.order_id}</td>
                       <td>{item?.title}</td>
                       <td>{item?.quantity}</td>
                       <td>$ {item?.quantity*item.price}</td>
                       <td>{item.email}</td>
                       <td><span className='badge rounded-pill text-bg-warning'>{item?.orderStatus}</span></td>
                       <td>
                         <select value={item.orderStatus} className='form-control' onChange={(e)=>handleUpdateOrderStatus(e,item)}>
                             <option value="Processing">Processing</option>
                             <option value="Confirmed">Confirmed</option>
                             <option value="Dispatched">Dispatched</option>
                             <option  value="Delivered">Delivered</option>
                         </select>
                       </td>
                   </tr>)
                    })}
                </tbody>
            </table>
            : <h3 className='text-secondary text-center'>No Orders Available</h3>}
        </div>
    </div>
  )
}

export default AdminOrders