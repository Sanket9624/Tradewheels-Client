import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const formatPrice = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const AdPostForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [photos, setPhotos] = useState([]);
  const price = watch('price');

  const handleSubmitForm = async (data) => {
    try {
      // Create FormData to handle both text fields and file uploads
      const formData = new FormData();
      formData.append('user_id', data.user_id); // Assuming user_id is available in the form data
      formData.append('brand', data.brand);
      formData.append('model', data.model);
      formData.append('year', data.year);
      formData.append('variant', data.variant || ''); // Add default value if not available
      formData.append('fuel_type', data.fuel_type);
      formData.append('ownership', data.ownership);
      formData.append('km_driven', data.km_driven);
      formData.append('price', data.price.replace(/,/g, '')); // Remove commas if present
      formData.append('color', data.color);
  
      // Append photos if available
      photos.forEach(photo => formData.append('photos', photo));
  
      // const token = 'your-authentication-token'; // Replace with your actual token
  
      // Post data to the server
      const response = await fetch('https://tradewheels.onrender.com/api/sellCar', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
        },
        body: formData, // FormData handles file uploads automatically
      });
  
      if (!response.ok) {
        throw new Error(response.statusText || 'Server error');
      }
  
      const result = await response.json();
      console.log('Car details submitted successfully:', result);
  
      // Call the redirect function or additional success logic
      redirectToSuccess(result);
    } catch (error) {
      console.error('Error submitting car details:', error.message);
      alert('Failed to submit car details: ' + error.message);
    }
  };
  

  const redirectToSuccess = (result) => {
    // Assuming `result` contains relevant information or status
    const successMessage = result?.message || 'Car details posted successfully';

    alert(successMessage);

    // Optionally redirect or handle post-success actions
    // window.location.href = '/success-page'; // Replace with your actual success page URL
  };

  const handlePhotoChange = (event) => {
    if (event.target.files.length <= 10) {
      setPhotos(Array.from(event.target.files));
    } else {
      alert('You can upload up to 10 photos only.');
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
            <input id="brand" type="text" {...register('brand', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.brand && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="model" className="text-lg font-medium text-gray-700">Model *</label>
            <input id="model" type="text" {...register('Model', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.brand && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="year" className="text-lg font-medium text-gray-700">Year *</label>
            <input id="year" type="number" {...register('year', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.year && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="fuel_type" className="text-lg font-medium text-gray-700">Fuel</label>
            <select id="fuel_type" {...register('fuel_type')} defaultValue="Petrol" className="p-3 border border-gray-300 rounded-lg">
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG & Hybrids">CNG & Hybrids</option>
              <option value="LPG">LPG</option>
            </select>
          </div>

          {/* <div className="flex flex-col space-y-2">
            <label htmlFor="transmission" className="text-lg font-medium text-gray-700">model</label>
            <select id="transmission" {...register('transmission')} defaultValue="Manual" className="p-3 border border-gray-300 rounded-lg">
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div> */}


<div className="flex flex-col space-y-2">
  <label htmlFor="variant" className="text-lg font-medium text-gray-700">Variant</label>
  <input id="variant" type="text" {...register('variant')} className="p-3 border border-gray-300 rounded-lg" />
</div>

<div className="flex flex-col space-y-2">
  <label htmlFor="color" className="text-lg font-medium text-gray-700">Color</label>
  <input id="color" type="text" {...register('color')} className="p-3 border border-gray-300 rounded-lg" />
</div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="km_driven" className="text-lg font-medium text-gray-700">KM Driven *</label>
            <input id="km_driven" type="number" {...register('km_driven', { required: true })} className="p-3 border border-gray-300 rounded-lg" />
            {errors.kmDriven && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="ownership" className="text-lg font-medium text-gray-700">Ownership</label>
            <select id="ownership" {...register('ownership')} defaultValue="1st" className="p-3 border border-gray-300 rounded-lg">
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
              {...register('price', { required: true })}
              value={price || ''}
              onChange={handlePriceChange}
              className="p-3 border border-gray-300 rounded-lg"
            />
            {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="photos" className="text-lg font-medium text-gray-700">Upload up to 10 photos</label>
            <input id="photos" type="file" multiple accept="image/*" onChange={handlePhotoChange} className="border border-gray-300 rounded-lg" />
            <div className="flex flex-wrap gap-2 mt-2">
              {photos.length > 0 && photos.map((photo, index) => (
                <img key={index} src={URL.createObjectURL(photo)} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
          </div>

          <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Post Car</button>
        </form>
      </div>
    </div>
  );
};

export default AdPostForm;
