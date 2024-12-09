
import './Home.css'
import logo from "../assets/logo.png"
import { FaMusic } from "react-icons/fa6";
import gredupedia5 from "../assets/gredupedia5.png"
import { MdLeaderboard } from "react-icons/md";
import { Link } from 'react-router';
import { FaQuestion } from 'react-icons/fa6';


const Home =()=> {
    return (
        <div className='home-container'>
        <div className='home-nav'>
          <div className='nav-button-wrapper'>
          <button className='button-3d'>
            <FaMusic fontSize={24}/>
          </button>
              <button className='button-3d'>
            <FaQuestion fontSize={24} />
          </button>
  
          </div>
        </div>
        <div className='home-title'>
            <img src={logo}/>
            <div className='home-button-wrapper'>
                <Link to="/play">
              <button style={{width:'100%'}} className='button-3d'>Mulai</button>
                </Link>
              <button className='button-3d'><MdLeaderboard/></button>
            </div>
        </div>
        <div className='home-footer'>
        <img src={gredupedia5}/>
  </div>
      </div>
    )
}


export default Home