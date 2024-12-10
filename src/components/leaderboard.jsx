

import "./leaderboard.css"
import { useState,useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Leaderboard = ()=> {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
      // Retrieve the leaderboard data from localStorage
      const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      setLeaderboard(storedLeaderboard);
    }, []);

    const navigate = useNavigate()

    const back =()=> {
        navigate("/")
    }
    return (
        <div className="leaderboard">
            <div className="leaderboard-nav">
            
                    <button onClick={back} className='button-3d'>   < IoMdArrowRoundBack fontSize={18}/></button>
              
            <h1>Papan Peringkat</h1>
            </div>
            <div className="leaderboard-container">
            {leaderboard.length > 0 ? (
          leaderboard.map((player, index) => (
            <div key={index} className="player-wrapper">
              <p>{index + 1}.</p>
              <p>{player.name}</p>
              <p>{player.score}</p>
            </div>
          ))
        ) : (
          <p>Belum ada data peringkat</p>
        )}

        

                
            </div>
        </div>
    )
}

export default Leaderboard