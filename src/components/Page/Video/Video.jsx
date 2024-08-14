import React from 'react'
import './Video.css'
import videoBg from '../../../../public/video/videobg2.mp4'
import useSound from 'use-sound'
// import { useNavigate } from 'react-router-dom';
import img from "../../../../public/images/images/Enginr.png"
import { Link } from 'react-router-dom';
// import Mute from '../Mute/Mute'
// import videoBg from '../../../public/video/1234.mp4'

function Video() {
    const [playSound] = useSound("public/video/Car.mp3");
    return (
        <div className='main'>
            <div className="overlay">
                <div className="over">
                    <video src={videoBg} autoPlay loop></video></div>
                <div className='text lg:text-7xl'>
                    <h1 >What we drive says a<br />lot about<br /> <h1 id='asd'>who we are</h1></h1>
                    {/* <p>hii</p> */}
                    {/* <Mute/> */}
                </div>
            </div>
            <div className='  relative flex justify-center top-[72%] '>
                <Link to='/home'><img src={img} className='w-44 h-44  bg-transparent' onClick={playSound} alt="" /></Link>
            </div>

        </div>
    )
}

export default Video
