import "./gameOver.css"
import { MdLeaderboard } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import gameoverNala from "../assets/nala/gameover.png"
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router";
import { FaCheck } from "react-icons/fa";
const GameOver=({gameOver,handleRestart,score,highestStreak})=> {

    const [username,setUsername]= useState('')
    const [isSaved,setIsSaved] = useState(false)
    if (!gameOver) return null

    const saveToLeaderboard = () => {
        if (username.trim() === "") {
          alert("Nama tidak boleh kosong!");
          return;
        }
    
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        const newEntry = { name: username, score };
        leaderboard.push(newEntry);
    
        // Sort leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);
    
        // Save updated leaderboard to localStorage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    
        setIsSaved(true)
      };

    return (
        <>
        
        <div className="gameOver-overlay">
        <div className="gameOver-container">
            <div className="stat-information">
                <div className="stat-container">
                <div className="stat-wrapper">
                    <p>Skor Kamu :</p>
                    <p style={{fontWeight:'bold'}}>{score}</p>
                </div>
                    <div className="stat-wrapper">
                        <p>Jawaban Beruntun Tertinggi</p>
                        <p style={{fontWeight:'bold'}}>{highestStreak}x</p>
                    </div>

                </div>

                    <div className="input-wrapper">
                        <input value={username} onChange={e=>setUsername(e.target.value)} type="text" maxLength={32} placeholder="Masukan nama kamu"/>
                        <button 
                        style={{color:'#30190F',    backgroundColor: isSaved ? "green" : "",}} 
                        onClick={saveToLeaderboard} 
                        disabled={isSaved} 
                        className="button-3d">
                        {isSaved?<FaCheck />:"kirim"}
                        </button>
                    </div>
                <div className="nav-wrapper">

                <button onClick={handleRestart}
                className="button-3d"><VscDebugRestart/></button>
                <Link to='/leaderboard'>
                <button className="button-3d"><MdLeaderboard/></button>
                </Link>
                <Link to="/">
                <button className="button-3d"><AiFillHome /></button>
                </Link>
                </div>
            </div>

            <div className="nala-message">
                <div className="nala-bubble">
                    <p>Masukan nama kamu agar bisa masuk papan peringkat!</p>
                </div>
                <img src={gameoverNala} />
            </div>
        </div>
        </div>
        </>
    )
}

export default GameOver