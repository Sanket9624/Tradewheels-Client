import React from 'react'
import clsx from 'clsx'
let isRed = false;

function changeColor() {
    const heartButton = document.getElementById('svgheart');

    if (isRed) {
        heartButton.style.fill = 'white';
        heartButton.style.color = 'black';

    } else {
        heartButton.style.fill = 'red';
        heartButton.style.color = 'red';
    }

    isRed = !isRed;

}


const Card = ({ variant }) => {

    return (
        <>
            {/* <h1 className='font-semibold text-2xl my-5 justify-center flex'>New Cars</h1> */}
        <div className='flex   justify-center gap-2'>
        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            <div className={clsx("max-w-sm rounded  hover:scale-105  transition-all overflow-hidden  shadow-md p-6 mb-6 hover:bg-indigo-50",{ 
               " hover:scale-0":variant==="grid" 
            })}>
                <img className="w-full "  src='public/images/images/cars/ford/42 (3).webp' alt="2016 Volkswagen Ameo" />
                <div className="px-6 py-4 flex flex-col gap-2">
                    <div className="font-bold text-xl mb-2 flex justify-between" >2016 Volkswagen Ameo
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="svgheart" className="w-6 h-6" onClick={changeColor}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                </div>
                    <div><p>HIGHLINE1.2L • Manual</p></div>
                    <div> <p>28,464 KM • 1ST OWNER • PETROL • MH-04</p></div>
                    <div className='flex justify-between font-semibold'> <p className='font-semibold'>₹9,814/month </p> <p  className='hover:text-green-600'> ₹5,02,000 </p></div>
                    <div> <p>Zero down payment</p></div>
                    <div className='flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                        Rupa Renaissance, Navi Mumbai</div>
                </div>
            </div>

            <div className="max-w-sm rounded  hover:scale-105  transition-all overflow-hidden  shadow-md p-6 mb-6 hover:bg-indigo-50">
                <img className="w-full" src='public/images/images/cars/honda/42 (2).webp' alt="2016 Volkswagen Ameo" />
                <div className="px-6 py-4 flex flex-col gap-2">
                    <div className="font-bold text-xl mb-2 flex justify-between" >2006 Honda Amaze
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="svgheart" className="w-6 h-6" onClick={changeColor}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div><p>HIGHLINE1.5L • Manual</p></div>
                    <div> <p>18,464 KM • 8TH OWNER • DIESEL • MH-06</p></div>
                    <div className='flex justify-between font-semibold'> <p className='font-semibold'>₹8,814/month </p> <p  className='hover:text-green-600'> ₹15,02,000 </p></div>
                    <div> <p>Zero down payment</p></div>
                    <div className='flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                        Rupa Renaissance, Juni Mumbai</div>
                </div>
            </div>

            <div className="max-w-sm rounded  hover:scale-105  transition-all overflow-hidden  shadow-md p-6 mb-6 hover:bg-indigo-50">
                <img className="w-full" src='public/images/images/cars/jeep/43 (3).webp' alt="2016 Volkswagen Ameo" />
                <div className="px-6 py-4 flex flex-col gap-2">
                    <div className="font-bold text-xl mb-2 flex justify-between" >2023 Jeep Wrangler
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="svgheart" className="w-6 h-6" onClick={changeColor}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div><p>HIGHLINE 3L • Manual</p></div>
                    <div> <p>500 KM • 1ST OWNER • PETROL • MH-04</p></div>
                    <div className='flex justify-between font-semibold'> <p className='font-semibold'>₹19,814/month </p> <p  className='hover:text-green-600'>  ₹60,02,000 </p></div>
                    <div> <p>Zero down payment</p></div>
                    <div className='flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                        Rupa Renaissance, Navi Mumbai</div>
                </div>
            </div>

            <div className="max-w-sm rounded  hover:scale-105  transition-all overflow-hidden  shadow-md p-6 mb-6 hover:bg-indigo-50">
                <img className="w-full" src='public/images/images/cars/kia/43 (1).webp' alt="2016 Volkswagen Ameo" />
                <div className="px-6 py-4 flex flex-col gap-2">
                    <div className="font-bold text-xl mb-2 flex justify-between" >2024 Kia Seltos
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="svgheart" className="w-6 h-6" onClick={changeColor}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div><p>HIGHLINE2.2L • Manual</p></div>
                    <div> <p>2,464 KM • 3rd OWNER • PETROL • MH-04</p></div>
                    <div className='flex justify-between font-semibold'> <p className='font-semibold'>₹9,814/month </p> <p  className='hover:text-green-600'> ₹25,02,000 </p></div>
                    <div> <p>Zero down payment</p></div>
                    <div className='flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                        Rupa Renaissance, Navi Mumbai</div>
                </div>
            </div>

            <div className="max-w-sm rounded  hover:scale-105  transition-all overflow-hidden  shadow-md p-6 mb-6 hover:bg-indigo-50">
                <img className="w-full" src='public/images/images/cars/mahindra/1-7-Exterior-11095156706-e1d3f3aee14e41a0bdade74d2837c514-Exterior-6.webp' alt="2016 Volkswagen Ameo" />
                <div className="px-6 py-4 flex flex-col gap-2">
                    <div className="font-bold text-xl mb-2 flex justify-between" >2018 Mahindra Scorpio
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="svgheart" className="w-6 h-6" onClick={changeColor}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div><p>HIGHLINE5.2L • Manual</p></div>
                    <div> <p>864 KM • 1ST OWNER • PETROL • MH-04</p></div>
                    <div className='flex justify-between font-semibold'> <p className='font-semibold'>₹12,814/month </p> <p  className='hover:text-green-600'> ₹18,02,000 </p></div>
                    <div> <p>Zero down payment</p></div>
                    <div className='flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                        Rupa Renaissance, Navi Mumbai</div>
                </div>
            </div>

            <div className="max-w-sm rounded  hover:scale-105  transition-all overflow-hidden  shadow-md p-6 mb-6 hover:bg-indigo-50">
                <img className="w-full" src='public/images/images/cars/toyota/44 (1).webp' alt="2016 Volkswagen Ameo" />
                <div className="px-6 py-4 flex flex-col gap-2">
                    <div className="font-bold text-xl mb-2 flex justify-between" >2015 Toyota Fortuner
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" id="svgheart" className="w-6 h-6" onClick={changeColor}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div><p>HIGHLINE10L • Manual</p></div>
                    <div> <p>58,464 KM • 1ST OWNER • PETROL • MH-04</p></div>
                    <div className='flex justify-between font-semibold'> <p className='font-semibold'>₹89,814/month </p> <p className='hover:text-green-600'> ₹85,02,000 </p></div>
                    <div> <p>Zero down payment</p></div>
                    <div className='flex'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                        Rupa Renaissance, Navi Mumbai</div>
                </div>
            </div>

        </div>
        </div>

        </>
    )
}

export default Card
