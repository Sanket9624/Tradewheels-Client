import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const mobileNo = location.state?.mobileNo; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!otp || !fullName || !email) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            const data = await verifyOtp(mobileNo, otp, fullName, email);
            // Store token in localStorage
            localStorage.setItem('authToken', data.token);
            navigate('/home');
        } catch (error) {
            console.error('OTP verification or signup failed:', error);
            alert('OTP verification failed. Please try again.');
        }
    };

    const verifyOtp = async (mobileNo, otp, fullName, email) => {
        const response = await fetch('https://tradewheels.onrender.com/api/user/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: mobileNo, // Make sure phone_number is included
                code: otp,
                full_Name: fullName,
                email
            }),
        });
        const data = await response.json();
        if (data.message === 'Invalid OTP') {
            throw new Error('Invalid OTP');
        }
        return data; // Ensure data contains the token
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Verify OTP and Complete Sign Up
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium leading-5 text-gray-700">OTP</label>
                            <div className="mt-1">
                                <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="fullName" className="block text-sm font-medium leading-5 text-gray-700">Full Name</label>
                            <div className="mt-1">
                                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Verify OTP & Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
