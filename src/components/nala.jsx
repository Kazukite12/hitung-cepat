
import bener1 from "../assets/nala/bener1.png"

import salah1 from "../assets/nala/salah1.png"

import "./nala.css"

import { useEffect,useState } from "react"


const Nala =({showNala,setShowNala,message,isCorrect})=> {

    const [isFading, setIsFading] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (showNala) {
              // Select image based on `isCorrect`
        
              //const randomImage = images[Math.floor(Math.random() * images.length)];
              setSelectedImage(isCorrect?bener1:salah1);
            const timer = setTimeout(() => {
                setIsFading(true); // Start fade-out animation
                setTimeout(() => {
                    setShowNala(false); // Hide the component after fade-out
                }, 500); // Match this duration with the fade-out animation time in CSS
            }, 10000); // Time before disappearing (e.g., 3 seconds)
            return () => clearTimeout(timer); // Clear timer if the component unmounts
        }
    }, [showNala, setShowNala,isCorrect]);

    if(!showNala) {
        return null
    }
    return (
        <div className='nala'>
            <div className="bubble">
                <p>{message || "Hebat 3x berturut turut"}</p>
            </div>
            <img src={selectedImage} alt="Nala Reaction" />
        </div>
    );
}


export default Nala