import React from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'

const About = () => {
  return (
<div>

  <Header/>
    <div className="section-info p-2 py-4 rounded-3 my-5 border-2 border-color-light shadow text-black" style={{ minHeight: '100px' }}>
    <div className="container-fluid">
      <div className="row ">
        <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
          <div className='w-25 text-center align-self-center'><i className="bi bi-bus-front fa-2x bg-"></i></div>
          <div><h6 className='fw-bold'>Free Shipping</h6><span className="font-light opacity-75">Free UK shipping when you spend  ₹30.</span></div>
        </div>
        <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
          <div className='w-25 text-center align-self-center'><i className="bi bi-flower2 fa-2x bg-"></i></div>
          <div><h6 className='fw-bold'>Get Fresh Products</h6><span className="font-light opacity-75">Find a range of best online organic food.</span></div>
        </div>
        <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
          <div className='w-25 text-center align-self-center'><i className="bi bi-currency-rupee fa-2x bg-"></i></div>
          <div><h6 className='fw-bold'>Moneyback Offer</h6><span className="font-light opacity-75">Free UK shipping when you spend ₹30.</span></div>
        </div>
        <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
          <div className='w-25 text-center align-self-center'><i className="bi bi-shield-x fa-2x bg-"></i></div>
          <div><h6 className='fw-bold'>Safe Payment</h6><span className="font-light opacity-75">We are using secure payment methods.</span></div>
        </div>
      </div>
    </div>
  </div>


<Footer/>
  </div>
  )
}

export default About