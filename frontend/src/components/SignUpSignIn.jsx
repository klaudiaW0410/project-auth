import { useNavigate } from "react-router-dom"
import "./sign-up-sign-in.css"


export const SignUpSignIn = () => {
    const navigate = useNavigate()

    const signUpClick = () => {
        navigate("/register")
    }

    const logInClick = () => {
        navigate("/signin")
    }
    return(
        <div className="sign-up-container">
            <button 
                className="sign-button sign-up-button" 
                onClick={signUpClick}
                >
                    sign up
            </button>
            <button 
                className="sign-button log-in-button"
                onClick={logInClick}
                >
                    log in
            </button>
        </div>
    )
}