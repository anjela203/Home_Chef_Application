import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/getError';
import MenuServices from '../../services/menu.services';

function EditMenu() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [image,setImage] = useState("");
    const {id} = useParams();

   
  useEffect(()=>{
    let isMounted = true;
    const getSingleMenuItem = async ()=>{
        try{
            const response = await MenuServices.getSingleMenuItem(id);
            console.log(response.data);
            if(response.status===200){
               const {title,description,image,price} = response.data;
                setTitle(title);
                setDescription(description);
                setPrice(price);
                setImage(image);
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

    const handleUpdate = async ()=>{
        try{
            let data = {
                title,
                description,
                price,
                image,
                menu_id:id
            }
            const response = await MenuServices.updateMenuItems(data);
            console.log(response.data);
            if(response.status===200){
                toast.success("Item Updated Successfully!");
             
            }
        }catch(err){
            console.log(err);
            toast.error(getErrorMessage(err));
        }
    }
  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
    <h2>Edit Menu</h2>
    <Link to="/dashboard/menu" className="btn btn-warning">Go Back</Link>
    </div>
      <hr/>

      <form>
        <div className='mb-3'>
            <label className='form-label'>Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className='form-control' type="text" placeholder='e.g. Grilled Chicken' />
        </div>
        <div className='mb-3'>
            <label>Image</label>
            <input value={image} onChange={(e)=>setImage(e.target.value)}  className='form-control' type="text" placeholder='Enter Image URL' />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Price (In USD)</label>
            <input value={price} onChange={(e)=>setPrice(e.target.value)}  className='form-control' type="number" placeholder='e.g. 45' />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  className='form-control' type="text" placeholder='Enter Description' ></textarea>
        </div>
        <button disabled={!title || !image || !price || !description} className='btn btn-warning' type="button" onClick={handleUpdate}>Update</button>

      </form>

    </div>
  )
}

export default EditMenu