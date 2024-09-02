import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const formatPrice = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Sell = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const price = watch('price');
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    try {
      // Prepare the data to be sent
      const payload = {
        user_id: data.user_id, // Assuming user_id is available in the form data
        brand: data.brand,
        model: data.model,
        year: data.year,
        variant: data.variant || '', // Add default value if not available
        fuel_type: data.fuel_type,
        ownership: data.ownership,
        km_driven: data.km_driven,
        price: data.price.replace(/,/g, ''), // Remove commas if present
        color: data.color,
      };

      // Post data to the server
      const response = await fetch('http://localhost:8000/api/sellCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response.statusText || 'Server error');
      }

      const result = await response.json();
      console.log('Car details submitted successfully:', result.car.id);

      // Redirect to CarImages with carId
      navigate(`/CarImages/${result.car.id}`, { state: { message: 'Car uploaded successfully!' } });

    } catch (error) {
      console.error('Error submitting car details:', error.message);
      alert('Failed to submit car details: ' + error.message);
    }
  };

  const handlePriceChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, '');
    setValue('price', formatPrice(rawValue));
  };

  return (
          <div className='p-20'>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Post Your Ad</h1>
        <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="category" className="text-lg font-medium text-gray-700">Selected category</label>
            <select id="category" {...register('category')} defaultValue="Cars" className="p-3 border border-gray-300 rounded-lg">
              <option value="Cars">Cars</option>
              <option value="Bikes">Bikes</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="brand" className="text-lg font-medium text-gray-700">Brand *</label>
            <input id="brand" name='brand' type="text" {...register('brand', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.brand && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="model" className="text-lg font-medium text-gray-700">Model *</label>
            <input id="model" name='model' type="text" {...register('model', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.model && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="year" className="text-lg font-medium text-gray-700">Year *</label>
            <input id="year" name='year' type="number" {...register('year', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.year && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="fuel_type" className="text-lg font-medium text-gray-700">Fuel</label>
            <select id="fuel_type" name='fuel_type' {...register('fuel_type')} defaultValue="Petrol" className="p-3 border border-gray-300 rounded-lg">
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG & Hybrids">CNG & Hybrids</option>
              <option value="LPG">LPG</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="variant" className="text-lg font-medium text-gray-700">Variant</label>
            <input id="variant" name='variant' type="text" {...register('variant')} className="p-3 border border-gray-300 rounded-lg" />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="color" className="text-lg font-medium text-gray-700">Color</label>
            <input id="color" name='color' type="text" {...register('color')} className="p-3 border border-gray-300 rounded-lg" />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="km_driven" className="text-lg font-medium text-gray-700">KM Driven *</label>
            <input id="km_driven" type="number" {...register('km_driven', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.kmDriven && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="ownership" className="text-lg font-medium text-gray-700">Ownership</label>
            <select id="ownership" name='ownership' {...register('ownership')} defaultValue="1st" className="p-3 border border-gray-300 rounded-lg">
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="4+">4+</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="text-lg font-medium text-gray-700">Set a Price *</label>
            <input
              id="price"
              type="text"
              name='price'
              {...register('price', { required: true })}
              value={price || ''}
              onChange={handlePriceChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
            {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Post Car</button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
