import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import Shop from '../Shop/Shop';
import Home from '../../Home';
import Error from '../../Error';
import Contact from '../../Contact/Contact';
import About1 from '../About/About';
import Cart from '../Cart/Cart';
import SinglePage from '../SinglePage/SinglePage';
import CheckOut from '../Checkout/Checkout';
import SendOtp from '../Signup/SendOtp';
import VerifyOtp from '../Signup/VerifyOtp';
import Video from "../Page/Video/Video";
import Profile from '../Profile/Profile';
import { CgProfile } from "react-icons/cg";
import CarImages from '../Sell/CarImages';
import UserTestDrives from '../userTestDrive/UserTestDrive';
import user from "../../../public/images/images/user.png";
import Sell from'../Sell/Sell';

function Navbar() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://tradewheels.onrender.com/api/user/user-name`, {
                    headers: {
                      'Content-type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
                    }
                  });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                setError('Could not fetch user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('userId');
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Router>
                    <nav className="relative bg-white shadow dark:bg-gray-800">
                        <div className="container px-6 md:py-3 mx-auto md:flex">
                            <div className="flex items-center justify-between">
                                <Link to="/">
                                    <img className="w-auto md:h-24 h-16" src="public/images/images/logos/website-logo.png" alt="" />
                                </Link>
                                <div className="flex md:hidden">
                                    <button
                                        onClick={toggleMenu}
                                        type="button"
                                        className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                        aria-label="toggle menu"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 ${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-between`}>
                                <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                                    <Link to="/home" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 md:mx-2">Home</Link>
                                    <Link to="/sell" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 md:mx-2">Sell</Link>
                                    <Link to="/shop" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 md:mx-2">Buy</Link>
                                    <Link to="/about" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 md:mx-2">About</Link>
                                    <Link to="/contact" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 md:mx-2">Contact</Link>
                                <Link to="/TestDrive" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 md:mx-2">TestDrive</Link>
                                {/* <Link to="/sell" className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2">SEll</Link> */}
                            
                                </div>
                                <div className="relative flex gap-3  md:mt-0">
                                    {userData ? (
                                        <div className=''>
                                            <Link to="/profile" className=''>
                                                <img src={user} className='h-7 w-7 mt-[17px] hover:scale-110 transition-all' />
                                                {userData && <span className="">hello, {userData.userName}</span>}
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <Link to="/SendOtp">
                                                <button className='bg-indigo-500 w-fit text-white mt-3 rounded px-3 py-2'>Register</button>
                                            </Link>
                                        </div>
                                    )}
                                    {userData && (
                                        <div>
                                            <Link to='/SendOtp'>
                                                <button onClick={handleLogout} className='bg-indigo-500 w-fit text-white mt-3 rounded px-3 py-2'>Logout</button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                    <Routes>
                        <Route path='/about' element={<About1 />} />
                        <Route path='/' element={<Video />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/shop' element={<Shop />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/SendOtp' element={<SendOtp />} />
                        <Route path='/verify-otp' element={<VerifyOtp />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<CheckOut />} />
                        <Route path='*' element={<Error />} />
                        <Route path='/sell' element={< Sell/>} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path="/CarImages/:carId" element={<CarImages />} />
                        <Route path='/singlepage/:id' element={<SinglePage />} />
                        <Route path='/TestDrive' element={<UserTestDrives />} />
                    </Routes>
                </Router>
            )}
        </>
    )
}

export default Navbar;
