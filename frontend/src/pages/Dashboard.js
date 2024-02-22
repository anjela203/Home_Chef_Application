import React, { useEffect } from 'react'
import './Dashboard.css';
import {NavLink,useRouteMatch} from 'react-router-dom';
import Header from '../components/Header';
import ProfilePage from './ProfilePage';
import DashboardHome from './Chef/DashboardHome';
import AdminMenus from './Chef/AdminMenus';
import AdminOrders from './Chef/AdminOrders';
import { ChefRoute, ProtectedRoute } from '../App';
import CreateMenu from './Chef/CreateMenu';
import EditMenu from './Chef/EditMenu';
import MyOrders from './Resident/MyOrders';
import { useAuth } from '../context/AuthContext';
function Dashboard({history}) {
    const match = useRouteMatch();
    const {user} = useAuth();
   
    const isChef = user?.role==='chef';
    

    const toggleDashboardMenu = ()=>{
        const toggleDashboardMenu = document.getElementById('dashboardMenu');
   
        if(toggleDashboardMenu.classList.contains('hideDashboard')){
         toggleDashboardMenu.classList.remove('hideDashboard')
        }else{
         toggleDashboardMenu.classList.add('hideDashboard')
        }
        
    }

 useEffect(()=>{
  if(!user){
    history.push('/login');
    return;
  }
 },[user]) 
 useEffect(()=>{
    //console.log(match)
    window.addEventListener('resize',()=>{
        const toggleDashboardMenu = document.getElementById('dashboardMenu');
        if(window.outerWidth <975) {
            toggleDashboardMenu.classList.add('hideDashboard')
        }
    });
 },[match]);  
  return (
    <div className='dashboard__wrapper'>
         <Header />
         <section className="dashboard__section">
        <div className="dashboard__menu d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" id="dashboardMenu" >
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
           <h3 className='logo'>Home Chef</h3>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column mb-auto">
            {isChef &&  <li className="nav-item">
              <NavLink to="/dashboard" exact className={`nav-link text-white`} activeClassName="activeLink" aria-current="page">
              
                Dashboard
              </NavLink>
            </li>}
            <li className="nav-item">
              <NavLink to="/dashboard/profile" className={`nav-link text-white`} activeClassName="activeLink" aria-current="page">
               
                Profile
              </NavLink>
            </li>

          {isChef ? <>
            <li className="nav-item">
              <NavLink to="/dashboard/menu" className={`nav-link text-white`} activeClassName="activeLink" aria-current="page">
                Menu
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/dashboard/orders" className={`nav-link text-white`} activeClassName="activeLink" aria-current="page">
               
                Orders
              </NavLink>
            </li>
          
          </> : 

          <li className="nav-item">
            <NavLink to="/dashboard/my-orders" className={`nav-link text-white`} activeClassName="activeLink" aria-current="page">
             
              My Orders
            </NavLink>
          </li>
          
          }

          
           
          
          </ul>
         
         
        </div>
        <div className="dashboard__expand">
          <i className="fa fa-bars" title="Toggle Menu?" onClick={toggleDashboardMenu}></i>
        </div>
        <div className="dashboard__content">
          
         
          <ProtectedRoute path={`${match.path}/profile`} exact component={ProfilePage}/>
          <ProtectedRoute path={`${match.path}/my-orders`} exact component={MyOrders}/>
          <ChefRoute path={`${match.path}/orders`} exact component={AdminOrders}/>
          <ChefRoute path={`${match.path}/menu`} exact component={AdminMenus}/>
          <ChefRoute path={`${match.path}/menu/create`} exact component={CreateMenu}/>
          <ChefRoute path={`${match.path}/menu/edit/:id`} exact component={EditMenu}/>
          <ProtectedRoute path={`${match.path}`} exact component={DashboardHome}/>
      
           
        </div>
    
  
    </section>

    </div>
  )
}

export default Dashboard