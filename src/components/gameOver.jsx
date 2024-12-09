import "./gameOver.css"
import { MdLeaderboard } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import gameoverNala from "../assets/nala/gameover.png"
import { AiFillHome } from "react-icons/ai";
const GameOver=({gameOver,handleRestart,score,highestStreak})=> {

    if (!gameOver) return null

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
                        <input type="text" maxLength={32} placeholder="Masukan nama kamu"/>
                        <button style={{color:'#30190F'}} className="button-3d">Kirim</button>
                    </div>
                <div className="nav-wrapper">

                <button onClick={handleRestart}
                className="button-3d"><VscDebugRestart/></button>
                <button className="button-3d"><MdLeaderboard/></button>
                <button className="button-3d"><AiFillHome /></button>
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