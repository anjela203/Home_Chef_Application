// MenuList.js
import React from 'react';
import {Link} from 'react-router-dom';

function MenuList({ menus }) {
  return (
    <div>
    {menus.length > 0 ?
       <div className='row'>
            {
                 menus.map((item,key)=>{
                    return(
                       <div key={key} className='col-md-4 col-sm-12 g-3'>
                       
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
                              <Link to={`/payment/${item?.menu_id}`} className="btn btn-warning mx-2">Buy Now</Link>
                              
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
  );
}

export default MenuList;
