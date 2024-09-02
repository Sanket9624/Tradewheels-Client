import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SendOtp() {
    const [mobileNo, setMobileNo] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (event) => {
        event.preventDefault();
        try {
            await fetch('http://localhost:8000/api/user/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: mobileNo }),
            });
            navigate('/verify-otp', { state: { mobileNo } });
        } catch (error) {
            console.error('Failed to send OTP:', error);
            alert('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Send OTP</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSendOtp}>
                        <div>
                            <label htmlFor="mobileNo" className="block text-sm font-medium leading-5 text-gray-700">Mobile Number</label>
                            <div className="mt-1">
                                <input type="text" id="mobileNo" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder="Mobile Number" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Send OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SendOtp;
