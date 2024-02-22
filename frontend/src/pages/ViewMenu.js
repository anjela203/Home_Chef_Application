import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuServices from '../services/menu.services';
import {useParams,Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/getError';

function ViewMenu() {
    const [menu,setMenu] = useState("");
    const {id} = useParams();
    

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



  return (
    <div>
      <Header activeLink={"menu"} />
      <main className='menu__page'>
      
      <div className='shadow bg-light h-50 d-flex'>
        <img className='w-50 h-50 rounded' src={menu?.image} alt={menu?.title} />
        <div className='p-3'>
        <h1>{menu?.title}</h1>
      <p>
        {menu?.description}
      </p>
      <Link to={`/payment/${menu?.menu_id}`} className="btn btn-warning mx-2">Buy Now</Link>
        </div>


      </div>
        
      </main>
      <Footer />
    </div>
  )
}

export default ViewMenu