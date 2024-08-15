import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const CarImages = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { carId } = useParams(); // Get the carId from URL params

  const handleSubmitForm = async () => {
    try {
      if (images.length > 0) {
        await uploadImages(carId);
        // Redirect to success page after successful image upload
        navigate(`/shop`, { state: { message: 'Car uploaded successfully!' } });
      } else {
        alert('Please select images to upload.');
      }
    } catch (error) {
      console.error('Error uploading photos:', error.message);
      alert('Failed to upload photos: ' + error.message);
    }
  };

  const uploadImages = async (carId) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch(`https://tradewheels.onrender.com/api/images/upload/${carId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText || 'Failed to upload images');
      }

      console.log('Photos uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error.message);
      throw error;
    }
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 10) {
      alert('You can upload up to 10 photos only.');
    } else {
      setImages(selectedFiles);
    }
  };

  return (
    <div className='p-20'>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Upload Car Images</h1>
        <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="images" className="text-lg font-medium text-gray-700">Upload up to 10 photos</label>
            <input 
              id="images" 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageChange} 
              className="border border-gray-300 rounded-lg" 
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {images.length > 0 && images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
          </div>
          <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Upload Images</button>
        </form>
      </div>
    </div>
  );
};

export default CarImages;
