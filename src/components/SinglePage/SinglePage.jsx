import React from 'react'
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';


function Singleproduct() {

    const [car, setCars] = useState([]);
    const { addItem } = useCart();
    const { id } = useParams(); // Get the carId from the URL params
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://tradewheels.onrender.com/api/user`, {
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


    const handleAddToCart = () => {
        const itemToAdd = {
            id: car.id,
            name: `${car.year} ${car.make} ${car.model}`, // Example for constructing the name
            image: images[1].imageUrl, // Assuming you have the image URL in your car object
            price: car.price,
            quantity: 1 // Assuming you always add one item at a time
        };
        addItem(itemToAdd);
        setMessage('Car added to wishlist');
    };

    useEffect(() => {
        fetchCarData();
        fetchImageData();
    }, [id]);

    const fetchCarData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/car/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCars(data);

        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    };

    const fetchImageData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/image/carImage/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };
    const [activeImg, setActiveImage] = useState()

    if (!car) {
        return <p>Loading...</p>;
    }
    return (

        <div className='flex flex-col justify-center items-center lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6'>

                {images.length > 0 && (<img src={images[0].imageUrl} alt="Main Image" />)}     
                {/* <img src={images[1].imageUrl} alt="Main Image" onClick={() => setActiveImage(images[1].imageUrl)} /> */}
                <div className='flex flex-row justify-between gap-1 h-24 w-1/4'>

                    {images.length > 0 && (<img src={images[1].imageUrl} alt="Main Image" onClick={() => setActiveImage(images[1].imageUrl)} />)}
                    {images.length > 0 && (<img src={images[2].imageUrl} alt="Main Image" onClick={() => setActiveImage(images[2].imageUrl)} />)}
                    {images.length > 0 && (<img src={images[3].imageUrl} alt="Main Image" onClick={() => setActiveImage(images[3].imageUrl)} />)}
                    {images.length > 0 && (<img src={images[4].imageUrl} alt="Main Image" onClick={() => setActiveImage(images[4].imageUrl)} />)}
                </div>

            </div>
            <div className='flex flex-col gap-4  lg:w-2/4'>
                <p className='text-gray-700 text-lg'>
                    {car.year} </p>
                <span className='text-3xl font-bold'>{car.make} {car.model}</span>
                <div className='flex gap-3 '>
                    <div className='bg-slate-300 text-base p-2 rounded-lg font-semibold'>{car.mileage}KM</div>
                    <div className='bg-slate-300 text-base p-2 rounded-lg font-semibold'> {car.fuel_type}</div>
                    <div className='bg-slate-300 text-base p-2 rounded-lg font-semibold'> {car.transmission_type}</div>

                </div>


                <h6 className='text-2xl'>Rs {car.price}</h6>
                <div className='flex flex-row items-center pt-4'>

                    {userData ? (
                        <button className='bg-blue-400 font-semibold px-5 py-2 text-white rounded-md'>Book Test Drive</button>
                    ) : (
                        <Link to="/login" className='bg-blue-400 font-semibold px-5 py-2 text-white rounded-md'>Login to Book Test Drive</Link>
                    )}
                    {message && <p className='pl-5'>{message}</p>}
                </div>
            </div>
        </div>


    );
};

// export default CarDetail;



export default Singleproduct



