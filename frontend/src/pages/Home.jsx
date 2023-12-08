import { Header } from "../components/Header"
import { Animation } from "../components/Animation"
import { SignUpSignIn } from "../components/SignUpSignIn"

export const Home = () => {

    return(
        <>
            <div className="app-container">
                
                    {<Header />}
                
                <div className="the-animation">
                    {<Animation />}
                </div>
                <div className="the-buttons">
                    {<SignUpSignIn />}
                </div>
            </div>
        </>
    )
}