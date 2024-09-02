import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

function Shop2() {
    const [cars, setCars] = useState([]);
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        year: '',
        variant: '',
        fuel_type: '',
        ownership: '',
        km_driven: '',
        price_min: '',
        price_max: '',
        color: '',
    });
    const [isFiltering, setIsFiltering] = useState(false);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchCarData();
        };
        fetchData();
    }, [filters, isFiltering]);

    const fetchCarData = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const url = isFiltering
                ? `http://localhost:8000/api/filter/cars?${query}`
                : 'http://localhost:8000/api/sellCar/cars';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCars(data.cars || data); // Handle data structure for filtered/all cars
            await fetchImageData((data.cars || data).map(car => car.id));
        } catch (error) {
            console.error('Error fetching car data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchImageData = async (carIds) => {
        try {
            const imagePromises = carIds.map(async (carId) => {
                const response = await fetch(`http://localhost:8000/api/images/${carId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return { carId, image: data };
            });
            const imagesArray = await Promise.all(imagePromises);
            const imagesObject = imagesArray.reduce((acc, { carId, image }) => {
                acc[carId] = image;
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

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const applyFilters = () => {
        setIsFiltering(true);
    };

    const clearFilters = () => {
        setFilters({
            brand: '',
            model: '',
            year: '',
            variant: '',
            fuel_type: '',
            ownership: '',
            km_driven: '',
            price_min: '',
            price_max: '',
            color: '',
        });
        setIsFiltering(false);
    };

    const getCarImage = (carId) => {
        const carImages = images[carId]?.images[3]?.image_url;
        return carImages ? carImages : 'placeholder-image-url';
    };

    return (
        <div className='flex flex-col md:flex-row'>
            {/* Filter Section */}
            <div className={`w-full md:w-1/4 p-4 border-r border-gray-300 ${isFilterExpanded ? '' : 'h-0 overflow-hidden'}`}>
                <button
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    className="w-full text-left text-indigo-600 font-semibold mb-4 focus:outline-none"
                >
                    {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
                </button>
                <div className={`transition-all duration-300 ${isFilterExpanded ? 'block' : 'hidden'}`}>
                    <h2 className='text-lg font-semibold mb-4'>Filters</h2>
                    <div className='space-y-4'>
                        <input
                            name="brand"
                            type="text"
                            placeholder='Brand'
                            value={filters.brand}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <input
                            name="model"
                            type="text"
                            placeholder='Model'
                            value={filters.model}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <select
                            name="year"
                            value={filters.year}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Year</option>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <input
                            name="variant"
                            type="text"
                            placeholder='Variant'
                            value={filters.variant}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <select
                            name="fuel_type"
                            value={filters.fuel_type}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Fuel Type</option>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="cng">CNG</option>
                            <option value="electric">Electric</option>
                        </select>
                        <select
                            name="ownership"
                            value={filters.ownership}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">Select Ownership</option>
                            <option value="1st">1st Owner</option>
                            <option value="2nd">2nd Owner</option>
                            <option value="3rd">3rd Owner</option>
                        </select>
                        <input
                            name="km_driven"
                            type="number"
                            placeholder='Max KM Driven'
                            value={filters.km_driven}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <input
                            name="price_min"
                            type="number"
                            placeholder='Min Price'
                            value={filters.price_min}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <input
                            name="price_max"
                            type="number"
                            placeholder='Max Price'
                            value={filters.price_max}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <input
                            name="color"
                            type="text"
                            placeholder='Color'
                            value={filters.color}
                            onChange={handleFilterChange}
                            className="block w-full rounded-md border-0 py-1.5 px-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <div className='flex gap-2 mt-4'>
                            <button
                                onClick={applyFilters}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Car Listings Section */}
            <div className='w-full md:w-3/4 p-4'>
                <div className='mb-4 flex items-center'>
                    <input
                        type="text"
                        placeholder='Search cars...'
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        className='w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                    <button
                        onClick={() => fetchCarData()}
                        className='ml-2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'
                    >
                        <BiSearch className='w-6 h-6' />
                    </button>
                </div>
                
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {cars.length > 0 ? (
                            cars.map(car => (
                                <div key={car.id} className='border rounded-lg overflow-hidden shadow-md'>
                                    <img src={getCarImage(car.id)} alt={car.model} className='w-full h-48 object-cover' />
                                    <div className='p-4'>
                                        <h3 className='text-xl font-semibold'>{car.brand} {car.model}</h3>
                                        <p className='text-gray-700'>{car.year} - {car.variant}</p>
                                        <p className='text-gray-500'>{car.fuel_type} | {car.ownership}</p>
                                        <p className='text-gray-900 mt-2'>{car.price} USD</p>
                                        <NavLink to={`/car/${car.id}`} className='mt-4 inline-block text-indigo-600 hover:text-indigo-800'>
                                            View Details
                                        </NavLink>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No cars found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop2;

