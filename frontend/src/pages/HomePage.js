// HomePage.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const {user} = useAuth();
  return (
    <div>
      <Header activeLink={'home'} />
      <main className='bg__home'>
        <h1>Welcome to Home Chef Service</h1>
        <p>Let's explore your favorite cuisines at our menus</p>
        {!user &&  <div className='d-flex'>
        <Link to="/login" className="btn btn-warning mx-2">Login</Link>
       <Link to="/register" className="btn btn-secondary mx-2">Register</Link>
        </div>}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
