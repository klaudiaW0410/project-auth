import Lottie from 'lottie-react'
import womanAnimation from '../assets/animation-woman-laptop.json'
import './animation.css'

export const Animation = () => {
    return(
        <>
            {<Lottie 
                className="lottie-animation" 
                animationData={womanAnimation} 
                loop={true} 
            />}
        </>
    )
}