import React from 'react'

export default function Offers() {
  return (
    <div className='flex md:flex-col flex-row justify-center gap-5 my-3' >
    <div className="bg-blue-500  flex flex-col  md:block hidden flex-shrink text-white p-6 rounded-lg">
      <div className='flex'><h2 className="text-2xl font-bold mb-4">Need a car loan?</h2>
      <img src='public/images/images/small.webp'/></div>
      <div className="grid grid-cols-3 mb-4">
        <div>
          <h3 className="text-xl font-bold">₹0 </h3>
          <p>Down payment</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">12% </h3>
          <p>Interest rate</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">72</h3>
          <p> Months EMI</p>
        </div>
      </div>
      <p className="text-sm mb-4">*T&C applied</p>
      <button className=" text-indigo-600 bg-white px-4 py-2 rounded">CHECK ELIGIBILITY</button>
    </div>
    <div className=" ">
      
      <img src="public/images/images/sakranti-2024-desktop.webp" alt="Man Flying Kite" className="rounded" />
    </div>
    <div className="">
    
        <img src="public/images/images/homepage-desktop-new.webp" alt="Car 1" className="rounded" />
       
    </div>
    </div>

  )
}
