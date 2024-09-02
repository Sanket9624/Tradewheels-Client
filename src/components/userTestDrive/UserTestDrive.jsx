import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserTestDrives() {
    const [testDrives, setTestDrives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTestDrives = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/testDrive/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch test drives');
                }

                const data = await response.json();
                setTestDrives(data.testDrives);
            } catch (error) {
                setError('Error fetching test drive details: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTestDrives();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Test Drives</h1>
            {testDrives.length === 0 ? (
                <p>No test drives booked yet.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-gray-500">No.</th>
                            <th className="px-6 py-3 text-left text-gray-500">Scheduled Date</th>
                            <th className="px-6 py-3 text-left text-gray-500">Scheduled Time</th>
                            <th className="px-6 py-3 text-left text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testDrives.map((testDrive, index) => (
                            <tr key={testDrive.id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{index + 1}</td> {/* Display sequential number */}
                                <td className="px-6 py-4">{new Date(testDrive.scheduled_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{testDrive.scheduled_time}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/singlePage/${testDrive.car_id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Car Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserTestDrives;
