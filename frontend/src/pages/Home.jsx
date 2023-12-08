import { userStore } from "../stores/userStore" 
import { useNavigate } from "react-router-dom"

import { Header } from "../components/Header"
import { Animation } from "../components/Animation"
import { SignUpSignIn } from "../components/SignUpSignIn"

export const Home = () => {
    const navigate = useNavigate()

    const storeHandleLogOut = userStore(state => state.handleLogout)
    const { isLoggedIn } = userStore()

    console.log('Logged in:', isLoggedIn)

    if(!isLoggedIn) {
        alert('no permission')
        navigate('/register')//Navigate to a certain route if not logged in! login? register?
    }


    const onLogoutClick = () => {
        storeHandleLogOut()
        alert('logout successful')
        navigate('/')
    }


    return(
        <>
            <div className="app-container">
                    {<Header />}
                <div className="the-animation">
                    {<Animation />}
                </div>
                <div className="the-buttons">
                    {<SignUpSignIn />}
                    <button onClick={onLogoutClick}>
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}