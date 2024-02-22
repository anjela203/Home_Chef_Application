import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/getError';
import MenuServices from '../../services/menu.services';

function CreateMenu() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [image,setImage] = useState("");

    const handleCreate = async ()=>{
        try{
            let data = {
                title,
                description,
                price,
                image
            }
            const response = await MenuServices.createMenuItem(data);
            console.log(response.data);
            if(response.status===200){
                toast.success("Item Created Successfully!");
                setTitle("");
                setDescription("");
                setImage("");
                setPrice("");
            }
        }catch(err){
            console.log(err);
            toast.error(getErrorMessage(err));
        }
    }
  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
    <h2>Create Menu</h2>
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
        <button disabled={!title || !image || !price || !description} className='btn btn-warning' type="button" onClick={handleCreate}>Create</button>

      </form>

    </div>
  )
}

export default CreateMenu