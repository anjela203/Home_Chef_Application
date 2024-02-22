// MenuPage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuList from '../components/MenuList';
import MenuServices from '../services/menu.services';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/getError';

function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [filteredMenu,setFilteredMenu] = useState([]);

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

const handleSearch = (e)=>{
  let query = e.target.value;
  if(query){
    let filteredList = menus.filter((item)=>{
      return item?.title.toLowerCase().match(query.toLowerCase());
    });
    setFilteredMenu(filteredList);
  }else{
    setFilteredMenu([]);
  }
}

  return (
    <div>
      <Header activeLink={"menu"} />
      <main className='menu__page'>
        <div className='d-flex justify-content-between align-items-center'>
        <h1>Our Menus</h1>
        <input type='search' onChange={handleSearch} className='form-control w-25 ' placeholder='Search Menu Here...' />
        </div>
        <MenuList menus={filteredMenu.length > 0 ? filteredMenu : menus} />
      </main>
      <Footer />
    </div>
  );
}

export default MenuPage;
