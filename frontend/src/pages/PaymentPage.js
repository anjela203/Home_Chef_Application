import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuServices from '../services/menu.services';
import {useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/getError';
import OrderServices from '../services/orderServices';
import { useAuth } from '../context/AuthContext';

function Payment({history}) {
    const [menu,setMenu] = useState("");
    const {id} = useParams();
    const [qty,setQty] = useState("1"); 
    const [cardNum,setCardNum] = useState("");
    const [expDate,setExpDate] = useState("");
    const [cvv,setCvv] = useState("");
    const {user} = useAuth();
    

    useEffect(()=>{
      let isMounted = true;
      const getSingleMenuItem = async ()=>{
          try{
              const response = await MenuServices.getSingleMenuItem(id);
              //console.log(response.data);
              if(response.status===200){
                 
                  setMenu(response.data);
              }
          }catch(err){
              console.log(err);
              toast.error(getErrorMessage(err));
          }
      }
  
      if(isMounted){
        getSingleMenuItem();
      }
  
      return ()=>{
          return isMounted = false;
      }
  },[id]);

const handleChangeQty = (e)=>{
    const value = e.target.value;
    if(value && Number(value) >= 1){
        setQty(value);
    }else{
        setQty("");
        toast.info("Qty cannot be less than 1");
    }

}

const handleOrderPlace = async ()=>{
    try{
        let data = {menu_id:menu.menu_id,user_id:user.id,quantity:qty}
        const response = await OrderServices.createOrder(data);
        console.log(response.data);
        if(response.status===200){
            toast.success("Order Placed Successfully!");
            history.push('/dashboard/my-orders');
        }
    }catch(err){
        console.log(err);
        toast.error(getErrorMessage(err));
    }
}

  return (
    <div>
      <Header activeLink={"menu"} />
        <main className='payment__page'>
           <div className='container-fluid bg-light shadow d-flex p-3 justify-content-center'>
            <div className='card p-2 m-2 w-50'>
                <div className='d-flex justify-content-between align-items-start'>
                    <div>
                    <img className='w-25 h-25' src={menu?.image} alt={menu?.title} />
                <h2>Order Summary:</h2>
                    </div>
                    <div className='text-center'>
                        <label className='text-center mb-2'><b>Quantity</b></label>
                        <input min={1} value={qty} onChange={handleChangeQty} type="number" className='form-control' />
                    </div>
                </div>
                <hr/>
                <div className='mb-2'>
                    <b>Title:</b> {menu?.title}
                </div>
                <div className='mb-2'>
                   <b> Price:</b> ${menu?.price}
                </div>
                <div className='mb-2'>
                    {menu?.description}
                </div>

                
            </div>
           <div className='card p-3 m-2'>
                <div className='card p-2 text-center'>
                    <h3>Total Amount</h3>
                    <h2>${qty * menu?.price}</h2>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Card Number</label>
                    <input minLength={12} value={cardNum} onChange={(e)=>setCardNum(e.target.value)} className='form-control' type="text" placeholder='e.g. 4242-4242-4244-4242'/>
                </div>
               <div className='form-group'>
               <div className='mb-3'>
                    <label className='form-label'>Expiry Date</label>
                    <input value={expDate} onChange={(e)=>setExpDate(e.target.value)} className='form-control' type="month"/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>CVV</label>
                    <input value={cvv} onChange={(e)=>setCvv(e.target.value)} className='form-control' type="number" placeholder='e.g. 433'/>
                </div>
                <button onClick={handleOrderPlace} className='btn btn-warning' disabled={!cardNum || !expDate || !qty >=1 || !cvv}>Pay Now</button>
               </div>
            </div>
           </div>
        </main>
      <Footer />
    </div>
  )
}

export default Payment