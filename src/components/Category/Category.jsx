import React from 'react'
import { Link } from 'react-router-dom'

function Category() {
  return (
<>
  <div className='grid md:grid-cols-7 grid-cols-3  gap-2 py-6 justify-center'>
    
    <div className="p-4 text-center w-auto hover:bg-blue-50 h-24 rounded  hover:scale-105 hover:transition-all" >
    <img src='public/images/images/logos/honda.webp'/>

  </div>
    <div className="p-4 text-center w-auto hover:bg-blue-50 h-24 rounded  hover:scale-105 hover:transition-all" >
    <img src='public/images/images/logos/hyundai.webp'/>

  </div>
  <div className="p-4 text-center w-auto hover:bg-blue-50 h-24 rounded  hover:scale-105 hover:transition-all" >
  <img src='public/images/images/logos/maruti-suzuki.webp'/>

  </div><div className="p-4 text-center hover:bg-blue-50 w-auto h-24 rounded  hover:scale-105 hover:transition-all" >
  <img src='public/images/images/logos/renault.webp'/>

  </div><div className="p-4 text-center hover:bg-blue-50 w-auto h-24 rounded  hover:scale-105 hover:transition-all" >
  <img src='public/images/images/logos/tata.webp'/>

  </div>
  <div className="py-4 text-center w-auto hover:bg-blue-50 h-24 rounded  hover:scale-105 hover:transition-all" >
  <img src='public/images/images/logos/toyota.webp'/>

  </div>
  <div className="py-4 text-center w-auto hover:bg-blue-50 h-24 rounded hover:scale-105 hover:transition-all" >
      <img src='public/images/images/logos/ford.webp'/>
 </div>
  </div>
</>  
)
}

export default Category






