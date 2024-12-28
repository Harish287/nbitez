import React from 'react'
import NewsLetter from '../../components/NewsLetter'
import { SocialsNetworks } from '../../components/SocialsNetworks'
import { Link } from 'react-router-dom'
import RoutePaths from '../../config'

const Footer = () => {

    return (
        <footer className='mt-5'>
            <NewsLetter />
            <div className='footer-content bg-black gap-3 px-3 px-lg-5 py-5'>
                <div className="f-content d-flex flex-wrap justify-content-space-between">
                    <div className="contacts w-20">
                        <h5 className='mt-2'>Our Address</h5>
                        <div className="opacity-75">
                            <div><i className="bi bi-geo-alt fd-color-primary me-2"></i>Madurai</div>
                            <div><i className="bi bi-phone fd-color-primary me-2"></i>+91 7092771118</div>
                            <div><i className="bi bi-envelope fd-color-primary me-2"></i>Nbitez@gmail.com</div>
                        </div>
                        <SocialsNetworks />
                    </div>
                    <div className="informations">
                        <h5 className='mt-2'>Information</h5>
                        <div className="opacity-75">
                            <div><a href="/about">About Us</a></div>
                            {/* <div><a href="#">Contact Us</a></div> */}
                   
                            {/* <div><a href="#">Frequently Questions</a></div> */}
                            <div><a href="#">Costomer Service</a></div>
                        </div>
                    </div>
                    <div className="account">
                        <h5 className='mt-2'>My Account</h5>
                        <div className="opacity-75">
                            <div><Link to={RoutePaths.userAccount}>My Account</Link></div>
                            <div><Link to={RoutePaths.userAccount}>Login Page</Link></div>
                            <div><a href="/cart">Shopping Cart</a></div>
                            <div><a href="/signup">Register Account</a></div>
                            {/* <div><a href="/myaccount">Logout</a></div> */}
                        </div>
                    </div>
                    <div className="help">
                        <h5 className='mt-2'>Useful Links</h5>
                        <div className="opacity-75">
                            <div><a href="/termsandconditions">Terms & Conditions</a></div>
                            <div><a href="/privacypolicy">Privacy Policy</a></div>
                            <div><a href="">Refund Policy</a></div>

                        </div>
                    </div>
                    {/* <div className="categories">
                        <h5 className='mt-2'>Categories</h5>
                        <div className="opacity-75">
                        <div><a href="#">Millet Snacks</a></div>
                            <div><a href="#">Edible Oil</a></div>
                            <div><a href="#">Honey</a></div>
                            <div><a href="#">Thokku Mix</a></div>
                            <div><a href="#">Dried Herbals</a></div>
                            <div><a href="#">Traditional Rices</a></div>
                        </div>
                    </div> */}
                </div>
                {/* <div className='my-5'>
                    <div className="d-flex flex-wrap gap-3">
                        <h6 className='fw-bold'>Food & Vegetabe: </h6>
                        <p className='opacity-50'><span>Carrots | </span><span>Broccoli | </span><span>Patato | </span><span>Carrots | </span><span>Broccoli | </span><span>Patato | </span><span>Carrots | </span><span>Broccoli | </span><span>Patato | </span></p>
                    </div>
                    <div className="d-flex flex-wrap gap-3">
                        <h6 className='fw-bold'>Health & Beauthy: </h6>
                        <p className='opacity-50'><span>Skin Kare | </span><span>Body Shower | </span><span>Makeup | </span></p>
                    </div>
                </div><hr />
                <div className="d-flex flex-wrap justify-content-between">
                    <p><img src="/img/payment.png" alt="" className='w-100'/></p>
                    <p className="opacity-75">Copyright &copy; 2023
                         By <span className='fw-bold'>Elfried Fortunatus KIDJE </span>
                            </p>
                </div> */}
            </div>
        </footer>
    )
}

export default Footer