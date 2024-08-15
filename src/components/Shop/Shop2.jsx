import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

function Card() {
    const [cars, setCars] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchCarData();
        };
        fetchData();
    }, []);

    const fetchCarData = async () => {
        try {
            const response = await fetch('https://tradewheels.onrender.com/api/sellCar/cars');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCars(data);
            await fetchImageData(data.map(car => car.id));  // Fetch images for each car
        } catch (error) {
            console.error('Error fetching car data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchImageData = async (carIds) => {
        try {
            const imagePromises = carIds.map(async (carId) => {
                
                const response = await fetch(`https://tradewheels.onrender.com/api/images/${carId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                return { carId, image: data };
            });
            
            const imagesArray = await Promise.all(imagePromises);
            const imagesObject = imagesArray.reduce((acc, { carId, image }) => {
                acc[carId] = image;  // Store images by carId
                return acc;
            }, {});
            
            setImages(imagesObject);
        } catch (error) {
            console.error('Error fetching image data:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const getCarImage = (carId) => {
        const carImages = images[carId].images[3]?.image_url;
        
        return carImages ? carImages : 'placeholder-image-url';
    };

    return (
        <>
            <div>
                <div className='flex justify-center gap-2'>
                    <div className='flex items-center mb-4'>
                        <BiSearch className='mr-2 h-6 w-6' />
                        <input
                            id="text"
                            name="text"
                            type="text"
                            placeholder='Search Cars...'
                            autoComplete="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='flex justify-center gap-2'>
                        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                            {cars.map((car) => (
                                <NavLink key={car.id} to={`http://localhost:5173/singlepage/${car.id}`}>
                                    <div className="max-w-sm rounded h transition-all overflow-hidden shadow-md p-6 mb-6">
                                        <img className="w-full" src={getCarImage(car.id)} alt={`${car.year} ${car.brand} ${car.model}`} />
                                        <div className="px-6 py-4 flex flex-col gap-2">
                                            <div className="font-bold text-xl flex justify-between">
                                                {car.brand} {car.model}
                                            </div>
                                            <div><p className='mb-2 mt-0 font-semibold text-base'>{car.year}</p></div>
                                            <div><p className='font-semibold text-base'>Variant: {car.variant}</p></div>
                                            <div className='flex justify-between font-semibold'>
                                                <p className='font-semibold'>Mileage: {car.km_driven} KM</p>
                                                <p className='hover:text-green-600 text-base'>₹{car.price}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='font-semibold text-base'>Fuel Type:</p>
                                                <p className="font-medium text-base"> {car.fuel_type}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='font-semibold text-base'>Ownership:</p>
                                                <p className="font-medium text-base"> {car.ownership}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='font-semibold text-base'>Color:</p>
                                                <p className="font-medium text-base"> {car.color}</p>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Card;
