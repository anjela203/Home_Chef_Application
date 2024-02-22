// AdminMenu.js
import React, { useState, useEffect } from 'react';
import MenuServices from '../../services/menu.services';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/getError';
import {Link} from 'react-router-dom';

function AdminMenu() {
  const [menus, setMenus] = useState([]);

  useEffect(()=>{
    let isMounted = true;
    const getAllMenuItems = async ()=>{
        try{
            const response = await MenuServices.getAllMenuItems();
            //console.log(response.data);
            if(response.status===200){
               
                setMenus(response.data);
            }
        }catch(err){
            console.log(err);
            toast.error(getErrorMessage(err));
        }
    }

    if(isMounted){
        getAllMenuItems();
    }

    return ()=>{
        return isMounted = false;
    }
},[]);


const getAllMenuItems = async ()=>{
    try{
        const response = await MenuServices.getAllMenuItems();
        //console.log(response.data);
        if(response.status===200){
           
            setMenus(response.data);
        }
    }catch(err){
        console.log(err);
        toast.error(getErrorMessage(err));
    }
}


const handleMenuItemDelete = async (item)=>{
   try{
    const response = await MenuServices.deleteMenuItem(item.menu_id);
    if(response.status===200){
        toast.success(`${item.title} Deleted Successfully!`);
        getAllMenuItems();
    }
   }catch(err){
    console.log(err);
    toast.error(getErrorMessage(err));
   }
}

  return (
    <div>
    <div className='d-flex justify-content-between align-items-center menuList'>
    <h2>All Menus</h2>
    <Link to="/dashboard/menu/create" className="btn btn-warning">Create</Link>
    </div>
      <hr/>
     <div>
        {menus.length > 0 ?
           <div className='row'>
                {
                     menus.map((item)=>{
                        return(
                           <div className='col-md-4 col-sm-12 g-3'>
                           
                             <div className="card h-100">
                               
                            <img className='card-img-top h-50' src={item.image} alt={item?.title} />
                           
                            <div className="card-body d-flex justify-content-between flex-column">
          
                             <div className="d-flex justify-content-between">
                             <h5 className="card-title">{item?.title}</h5>
                             </div>
                              <p className="card-text">{item?.description.slice(0,100)}...</p>
                              <div className="card-footer d-flex justify-content-between align-items-center">
                                  <h4>${item?.price}</h4>
                                  <div>
                                  <Link to={`/dashboard/menu/edit/${item?.menu_id}`} className="btn btn-warning mx-2">Edit</Link>
                                  <button onClick={()=>handleMenuItemDelete(item)} className="btn btn-danger mx-2">Delete</button>
                                  <Link className="btn btn-secondary"  to={`/menu/${item.menu_id}`}> View </Link>
                                  </div>
                              </div>
                            </div>
                          </div>
                         
                            </div>
                       
                        )
                    })
                }
            </div>
        : 
        <div>
         
            <h3 className='text-secondary text-center mt-5'>No Items Available</h3>
            
        </div>    
        }
     </div>
    </div>
  );
}

export default AdminMenu;
