import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data.user);
        setFullName(data.user.full_Name);
        setEmail(data.user.email);
      } catch (error) {
        setError('Could not fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateFullName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/user/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ full_Name: fullName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update full name');
      }

      const result = await response.json();
      alert(result.message);
      setUserData(result.user);
      setEdit(false);
    } catch (error) {
      alert('Error updating full name: ' + error.message);
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ phone_number: userData.phone_number }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const result = await response.json();
      alert(result.message);
      setIsOtpSent(true);
    } catch (error) {
      alert('Error sending OTP: ' + error.message);
    }
  };

  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/user/update-number', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ new_phone_number: userData.phone_number, code: otp }),
      });

      if (!response.ok) {
        throw new Error('Failed to update phone number');
      }

      const result = await response.json();
      alert(result.message);
      setUserData(result.user);
      setEdit(false);
      setIsOtpSent(false);
    } catch (error) {
      alert('Error updating phone number: ' + error.message);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/user/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ newEmail: email }),
      });

      if (!response.ok) {
        throw new Error('Failed to update email');
      }

      const result = await response.json();
      alert(result.message);
      setUserData(result.user);
      setEdit(false);
    } catch (error) {
      alert('Error updating email: ' + error.message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

      {edit ? (
        <form className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-lg font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Removed phone number field from the edit form */}

          <div>
            <label htmlFor="email" className="block text-gray-700 text-lg font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              onClick={handleUpdateFullName}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Full Name
            </button>
            <button
              onClick={handleUpdateEmail}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Email
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700 text-lg">Full Name: <span className="font-semibold">{userData.full_Name}</span></p>
            <p className="text-gray-700 text-lg">Phone Number: <span className="font-semibold">+91{userData.phone_number}</span></p>
            <p className="text-gray-700 text-lg">Email: <span className="font-semibold">{userData.email}</span></p>
          </div>
          <button
            onClick={() => setEdit(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
