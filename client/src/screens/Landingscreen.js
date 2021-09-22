import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration: 2000
});

function Landingscreen(){
    return(
        <div className='row landing'>
            <div className='col-md-12 text-center'>

                <h2 data-aos='zoom-in' style={{color:'white' , fontSize : '100px'}}>Rooms By Escay</h2>
                <h1 data-aos='zoom-out' style={{color:'white'}}>"Don't Come Here If You Wanna Live"</h1>
                
                <Link to='/home'>
                    <button className='btn landingbtn' style={{color : 'black'}}>Get Started</button>
                </Link>

            </div>
        </div>
    )
}

export default Landingscreen;