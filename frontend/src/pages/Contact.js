import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Contact() {
  return (
    <div>
        <Header activeLink={"contact"}/>
        <div className='about__wrapper'>
            <h1 className='text-center'> Contact Us</h1>
            <div className='container'>
               <div className='d-flex contact__card__wrapper justify-content-center mt-5 align-items-center'>
                    <div className='card m-2 p-3 shadow d-flex flex-column 
                    justify-content-center align-items-center'>
                        <i className="fa fa-phone mb-3 text-warning" aria-hidden="true"></i>
                        <h4>+01 1234567890</h4>
                    </div>
                    <div className='card m-2 p-3 shadow d-flex flex-column 
                    justify-content-center align-items-center'>
                        <i className="fa fa-map-marker mb-3 text-warning" aria-hidden="true"></i>
                        <h4>New York, USA</h4>
                    </div>
                    <div className='card m-2 p-3 shadow d-flex flex-column 
                    justify-content-center align-items-center'>
                        <i className="fa fa-envelope mb-3 text-warning" aria-hidden="true"></i>
                        <h4>test@gmail.com</h4>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Contact