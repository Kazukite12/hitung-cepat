import "./play.css"
import gredupedia5 from "../assets/gredupedia5.png"
import logo from "../assets/logo.png"
import { useEffect, useState,useCallback } from "react"
import Nala from "./nala"
import { FaMusic } from "react-icons/fa6"

import { FaQuestion } from "react-icons/fa";

import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router"
import GameOver from "./gameOver"
import ScorePopup from "./score"
import correct from "../assets/audio/correct.m4a"
import wrong from "../assets/audio/wrong.mp3"
import backsoundmusic from "../assets/audio/backsound.m4a"
import CountdownOverlay from "./countdown"
import { useRef } from "react"

const Play =()=> {
    const buttonNumber = [7,8,9,4,5,6,1,2,3,0,'c','ok']
    const operators = ["+", "-", "*", "/"]

    const [answer,setAnswer] = useState('')
    const [level,setLevel] = useState(1)

    const [showHint, setShowHint] = useState(false)
    const [hint,setHint] = useState(3)
 
    const [timer,setTimer] = useState(30)
    const [question, setQuestion] = useState([])
    const [answerIndex,setAnswerIndex] = useState(2)
    const [score,setScore] = useState(0)
    const [streak,setStreak] = useState(0)
    const [gameOver,setGameOver] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [backsoundMuted,setBacksoundMuted] = useState(false)


    const [isCorrect,setIsCorrect] = useState(false)

    const [showNala,setShowNala] = useState(false)

    const [nalaMessage,setNalaMessage] = useState('')
    const [highestStreak,setHighestStreak] = useState(0)

    const [showCountdown, setShowCountdown] = useState(true);

    const handleCountdownEnd = () => {
      setShowCountdown(false); // Hide the overlay when countdown ends

    };

    useEffect(() => {
      if (!showCountdown) {
        
        const interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(interval)
              setGameOver(true)
              return 0
            }
            return prevTimer - 1
          })
        }, 1000)
    
        return () => clearInterval(interval)
      }
      }, [timer,showCountdown])

      const generateEquation = (level) => {
   
        let equation = [];
        let result;
    
        if (level >= 1 && level <= 30) {
            // 2-number equation
            const num1 = Math.floor(Math.random() * 20) + 1;
            const num2 = Math.floor(Math.random() * 20) + 1;
            const operator = operators[Math.floor(Math.random() * 3)]; // Exclude division
            equation = [num1, operator, num2];
        } else if (level >= 31 && level <= 60) {
            // 3-number equation
            const num1 = Math.floor(Math.random() * 20) + 1;
            const num2 = Math.floor(Math.random() * 20) + 1;
            const num3 = Math.floor(Math.random() * 20) + 1;
            const operator1 = operators[Math.floor(Math.random() * operators.length)];
            const operator2 = operators[Math.floor(Math.random() * operators.length)];
            equation = [num1, operator1, num2, operator2, num3];
        } else {
            // 4-number equation for higher levels
            const num1 = Math.floor(Math.random() * 20) + 1;
            const num2 = Math.floor(Math.random() * 20) + 1;
            const num3 = Math.floor(Math.random() * 20) + 1;
            const num4 = Math.floor(Math.random() * 20) + 1;
            const operator1 = operators[Math.floor(Math.random() * operators.length)];
            const operator2 = operators[Math.floor(Math.random() * operators.length)];
            const operator3 = operators[Math.floor(Math.random() * operators.length)];
            equation = [num1, operator1, num2, operator2, num3, operator3, num4];
        }
    
        // Ensure division results in integers
        for (let i = 0; i < equation.length; i++) {
            if (equation[i] === "/") {
                const dividend = equation[i - 1];
                const divisor = equation[i + 1];
                if (dividend % divisor !== 0) {
                    equation[i + 1] = 1; // Adjust divisor to ensure clean division
                }
            }
        }
    
        // Evaluate the equation while respecting operator precedence
        const evaluateEquation = (eq) => {
            const precedence = { "*": 2, "/": 2, "+": 1, "-": 1 };
            const stack = [];
            const operatorStack = [];
    
            for (let token of eq) {
                if (typeof token === "number") {
                    stack.push(token);
                } else if (["+", "-", "*", "/"].includes(token)) {
                    while (
                        operatorStack.length &&
                        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                    ) {
                        const operator = operatorStack.pop();
                        const b = stack.pop();
                        const a = stack.pop();
                        switch (operator) {
                            case "+":
                                stack.push(a + b);
                                break;
                            case "-":
                                stack.push(a - b);
                                break;
                            case "*":
                                stack.push(a * b);
                                break;
                            case "/":
                                stack.push(Math.floor(a / b));
                                break;
                            default:
                                break;
                        }
                    }
                    operatorStack.push(token);
                }
            }
    
            while (operatorStack.length) {
                const operator = operatorStack.pop();
                const b = stack.pop();
                const a = stack.pop();
                switch (operator) {
                    case "+":
                        stack.push(a + b);
                        break;
                    case "-":
                        stack.push(a - b);
                        break;
                    case "*":
                        stack.push(a * b);
                        break;
                    case "/":
                        stack.push(Math.floor(a / b));
                        break;
                    default:
                        break;
                }
            }
    
            return stack[0];
        };
    
        result = evaluateEquation(
            equation.map((item) => (typeof item === "string" ? item : parseInt(item)))
        );
    
        // Create the question array
        const question = [...equation, "=", result];


        const validIndices = question
            .map((item, index) => (item === "=" ? null : index))
            .filter((index) => index !== null);
        const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
        setAnswerIndex(randomIndex)
        return question;
    };


    useEffect(()=> {
      if (streak > highestStreak) {
        setHighestStreak(streak)
      }
    },[streak])

    const audioRef = useRef(null);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 1.5; // Skip the first 0.3 seconds
      }
    }, []);
    


    const useHint =()=>  {
      if (hint > 0 ) {
        setShowHint(true)
        setHint(prevHint => prevHint - 1)
        setAnswer(question[answerIndex])
      }
    }

    const generateQuestion = () => {
 
            const question = generateEquation(level);
    
        setQuestion(question);


        
    };
       
        useEffect(()=> {
            generateQuestion()

        },[])


        var correctAudio = new Audio(correct)
        var wrongAudio = new Audio(wrong)

        const muteAudio =()=> {
          if(backsoundMuted) {
            setBacksoundMuted(false)
          } else {
            setBacksoundMuted(true)
          }
        }
      const checkAnswer = () => {
        if (answer == question[answerIndex]) {
          setScore(prevScore => prevScore + 10)
          setLevel(prevLevel => prevLevel + 1)
          setStreak(prevLevel => prevLevel + 1)
          setTimer(30)
          generateQuestion()
          setIsCorrect(true)
          setAnswer('')
          setShowNala(true)
          setShowPopup(true);
          correctAudio.play()

          setTimeout(() => {
            setShowPopup(false);
          }, 300); // Display for 1 second
          if(streak > 2) {
            setNalaMessage(`hebat ${streak}x berturut-turut`)
          }else {

            setNalaMessage('Tepat Sekali')
          }
        } else {
          // Handle wrong answer
          setShowNala(true)
          setNalaMessage('Masih salah nih, yuk coba lagi')
          wrongAudio.play()
          setIsCorrect(false)
          setAnswer('')
          setStreak(0)      //   checkAnswer()k(0)
        }
      }

      // useEffect(()=> {

      // },[answer])
      
    
      const handleAddAnswer = useCallback((value) => {
        if (value === 'c') {
          setAnswer('')
        } else if (value === 'ok') {
          checkAnswer()
        } else {
          setAnswer(prev => prev + value)
        }
      })

      const handleRestart =()=> {
        setStreak(0)
        setTimer(30)
        setHighestStreak(0)
        generateQuestion()
        setAnswer('')
        setLevel(1)
        setHint(3)
        setScore(0)
        setGameOver(false)
      
    }

    
    return (
        <div className="play-container">
          {showCountdown && <CountdownOverlay onCountdownEnd={handleCountdownEnd} />}
          <audio ref={audioRef} muted={backsoundMuted} src={backsoundmusic} loop autoPlay />
          <ScorePopup score={20} triggerPopup={showPopup} />
          <GameOver gameOver={gameOver} handleRestart={handleRestart} score={score} highestStreak={highestStreak}/>
            <div className="play-nav"> 
                <img src={logo}/>
                <h1>{timer}</h1>
                <p style={{fontWeight:'700'}}>Score: {score}</p>
            </div>
            <div className="play-main">
                <div className="play-question">
                    {question.map((item,index)=> {
                      
                        if (index === answerIndex) return  <div className="number-wrapper">
                          {answer == "*"?"x":answer}
                       
                          </div>;

                        if (item=='*') return  <div className="number-wrapper">x</div>
                        return (

                            <div className="number-wrapper">{item}</div>
                        )
                   
                    })}
                    
                  
                </div>

                <div className="play-numpad">
                    <div className="numpad-container">
                    {buttonNumber.map((item)=> {
                        return (
                            <div onClick={()=>handleAddAnswer(item)} className="numpad-number">{item}</div>
                        )
                    })}
                    </div>

                    <div className="operation-container">
                    {operators.map((item)=> {
                      if (item=="*") {
                        return  <div onClick={()=>handleAddAnswer(item)} className="numpad-number">X</div>
                      }
                        return (
                            <div onClick={()=>handleAddAnswer(item)} className="numpad-number">{item}</div>
                        )
                    })}
                    </div>

                </div>

            </div>

            <Nala showNala={showNala} setShowNala={setShowNala} message={nalaMessage} isCorrect={isCorrect}/>

            <div className="play-footer">
              <div className="footer-level">
            <Link to="/">
              <button className='button-3d'>
          < IoMdArrowRoundBack fontSize={24}/>
          </button>
            </Link>
              <button onClick={muteAudio} className={muteAudio?'button-3d muted':'button-3d'}>
            <FaMusic fontSize={24}/>
          </button>
              <button disabled={hint==0} onClick={useHint} className='button-3d'>
                Hint {hint}
          </button>
                <p>Level : {level}</p>
              </div>
                <img src={gredupedia5}/>
                
            </div>

        
        </div>
    )
}


export default Play