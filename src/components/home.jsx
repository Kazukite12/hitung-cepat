
import './home.css'
import logo from "../assets/logo.png"
import { FaMusic } from "react-icons/fa6";
import gredupedia5 from "../assets/gredupedia5.png"
import { MdLeaderboard } from "react-icons/md";
import { Link } from 'react-router';
import { FaQuestion } from 'react-icons/fa6';
import backsoundmusic from "../assets/audio/backsound.m4a"
import About from './aboutOverlay';
import { useState } from 'react';

const Home =()=> {
  const [showAbout,setShowAbout] = useState(false)
    return (
        <div className='home-container'>

          <About showAbout={showAbout} setShowAbout={setShowAbout}/>
           
        <div className='home-nav'>
          <div className='nav-button-wrapper'>
      

          <Link to="/leaderboard">
              <button className='button-3d'><MdLeaderboard/></button>
                </Link>
          
          </div>
        </div>
        <div className='home-title'>
            <img src={logo}/>
            <div className='home-button-wrapper'>
                <button onClick={()=>setShowAbout(true)} style={{width:'max-content'}} className='button-3d'>?</button>
                <Link to="/play">
              <button style={{width:'100%'}} className='button-3d'>Mulai</button>
                </Link>

            </div>
        </div>
        <div className='home-footer'>
        <img src={gredupedia5}/>
  </div>
      </div>
    )
}


export default Home