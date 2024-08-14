"use client";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.components.css'
// import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <>
    <div className=" relative">
     
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        
        <SwiperSlide className='lg:h-[500px]'>
          <div className=' flex flex-col flex-shrink absolute z-30 sm:left-10 justify-center left-0  md:left-16 '>
        <h1 className=' text-white font-bold text-sm sm:text-lg md:text-3xl lg:text-4xl'>Certified car with</h1>
        <h1 className=' text-white font-bold text-sm sm:text-lg md:text-4xl lg:text-5xl'>Upto 12 Month Warrenty Plan</h1>
       <div className='justify-center flex'>
       <Link to={"http://localhost:5173/shop"}> <button className='bg-lime-500 w-fit text-white mt-3 rounded px-3 py-2'>Explore Here</button>
       </Link></div></div>
        <img src='../../public/images/images/banner2.webp'/>
          
            </SwiperSlide>
        <SwiperSlide className='h-[500px]'>
        <div className=' flex flex-col flex-shrink absolute z-30 sm:left-10 left-0  md:left-16 '>
        <h1 className=' text-white font-bold text-sm sm:text-lg md:text-3xl lg:text-4xl'>Always There for You.</h1>
        <h1 className=' text-white font-bold text-sm sm:text-lg md:text-4xl lg:text-5xl'>Get Car At Zero Down Payment</h1>
        <div className='justify-center flex'>

        <Link to={"http://localhost:5173/shop"}> <button className='bg-lime-500 w-fit text-white mt-3 rounded px-3 py-2'>Explore Here</button>
       </Link></div>
        </div>
        <img src='../../public/images/images/banner3.webp' className='h-[660px]'/>
            </SwiperSlide>
        <SwiperSlide className='h-[500px]'>
        <div className=' flex flex-col flex-shrink absolute z-30 sm:left-10 left-0  md:left-16 '>
        <h1 className=' text-white font-bold text-sm sm:text-lg md:text-3xl lg:text-4xl'>Driving in style, leaving a lasting impression</h1>
        <h1 className=' text-white font-bold text-sm sm:text-lg md:text-4xl lg:text-5xl'>Get Best Offers On Festivals</h1>
        <div className='justify-center flex'>

        <Link to={"http://localhost:5173/shop"}> <button className='bg-lime-500 w-fit text-white mt-3 rounded px-3 py-2'>Explore Here</button>
       </Link></div>
        </div>
        <img src='../../public/images/images/banner4.webp'/>
            </SwiperSlide>
      
       
      </Swiper>
            </div>
    </>
  );
}
