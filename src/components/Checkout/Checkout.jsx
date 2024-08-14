import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

function CheckOut() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  
  // Use useHistory to redirect after form submission
  // const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !streetAddress || !city || !state || !zipCode || !country) {
      let missingFields = [];
      if (!firstName) {
        missingFields.push("First Name");
      }
      if (!lastName) {
        missingFields.push("Last Name");
      }
      if (!email) {
        missingFields.push("Email");
      }
      if (!streetAddress) {
        missingFields.push("streetAddress");
      }
      if (!city) {
        missingFields.push("city");
      }
      if (!state) {
        missingFields.push("state");
      }
      if (!zipCode) {
        missingFields.push("zipCode");
      }
      if (!country) {
        missingFields.push("country");
      }
      // Print missing fields to console
      console.log("Please fill in the following field(s):", missingFields.join(', '));
      return;
    }

    try {
      await checkoutUser(firstName, lastName, email, streetAddress, city, state, zipCode, country);
      redirectToSuccess();
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  const checkoutUser = async (firstName, lastName, email, streetAddress, city, state, zipCode, country) => {
    const checkoutData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country
    };

    try {
      const response = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
      
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log('Checkout successful:', data);
    } catch (error) {
      throw new Error('Checkout failed');
    }
  };
  const redirectToSucess = () => {
    if (!email){
        window.prompt("enter email")
    }

    window.location.href = './cart'; // Update the path as per your folder structure
};

  return (
   <> 
    <div className='mx-auto max-w-7xl px-4 pt-2 sm:px-6  bg-white mt-5 lg:px-8'>
   <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
   <div className='lg:col-span-3'>
   <form onSubmit={handleSubmit}>
            <div className="space-y-12">

    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={firstName} onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              value={lastName} onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email} onChange={(e) => setEmail(e.target.value)} 
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Country
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="street-address"
              id="street-address"
              value={country} onChange={(e) => setCountry(e.target.value)} 
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="street-address"
              id="street-address"
              value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} 
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              value={city} onChange={(e) => setCity(e.target.value)} 
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
            State / Province
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="region"
              id="region"
              value={state} onChange={(e) => setState(e.target.value)} 
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              value={zipCode} onChange={(e) => setZipCode(e.target.value)} 
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>

   
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
      Cancel
    </button>
    <button
      type="submit"
      onClick={redirectToSucess}  
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Pay
    </button>
  </div>
  </form>
  </div>
  {/* <div className='lg:col-span-2'>
  <div className='mx-auto max-w-7xl px-4 pt-2 sm:px-6  bg-white mt-5 lg:px-8'>

<h1 className='text-2xl mt-5 font-bold'> CART</h1>
<div className="mt-8">
    <div className="flow-root">
        <ul role="list" className="my-6 divide-y divide-gray-200">
            {products.map((product) => (
                <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="ml-4 flex  flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                    <a href={product.href}>{product.name}</a>
                                </h3>
                                <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {product.quantity}</p>

                            <div className="flex">
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
</div>


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
    <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>$262.00</p>
    </div>
    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
    <div className="mt-6">
        <Link
            to="/Checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
            Checkout
        </Link>
    </div>
    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
            or{' '}
            <Link to="/shop"><button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
            >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
            </button>
            </Link>
        </p>
    </div>
</div></div>
</div> */}
  </div>
  </div>
  </>
  )
}

export default CheckOut
