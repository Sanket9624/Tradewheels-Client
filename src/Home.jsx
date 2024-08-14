import React from 'react'
import Banner from './components/Banner/Banner'
import Category from './components/Category/Category'
import Offers from './components/Offers/Offers'
import Divider from './components/Divider/Divider'
import Footer from './components/Footer/Footer'
import Card from './components/Card/Card'
import Review2 from './components/Review2/Review2'
import { Link } from 'react-router-dom'
function Home() {

   return (
   
      <>
   <div className='bg-white '>
        {/* <Navbar/> */}
         <Banner />
         <div className="flex flex-col justify-center items-center pt-3">
         <h1 className='text-[40px] text-blue font-medium '>Category</h1>
        </div> 
        <Link to={"/shop"}> <Category /></Link> 
         {/* <div className="flex flex-col justify-center items-center pt-3">
        <h1 className='text-[40px] text-blue font-medium '>Product Card</h1>
        </div>  */}
         {/* <Card /> */}
         <div className="flex flex-col justify-center items-center pt-3">
        <h1 className='text-[40px] text-blue font-medium '>Offers</h1>
        </div> 
         <Offers/>
         <div className="flex flex-col justify-center items-center pt-3">
         <h1 className='text-[40px] text-blue font-medium '>Review</h1>
        </div> 
         <Review2/>
         </div>
<Divider/>
<Footer/>    
      </>
   )
}

export default Home
