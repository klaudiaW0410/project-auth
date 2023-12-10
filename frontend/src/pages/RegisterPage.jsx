import { userStore } from '../stores/userStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'

export const RegisterPage = () => {

    const [ userName, setUserName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const navigate = useNavigate()

    const storeHandleRegister = userStore(state => state.handleSignup)

    const onRegisterClick = async () => {
        if (!userName || !email || !password) {
            alert('Please enter username, email and password')
            return
        }
        try {
            await storeHandleRegister(userName, email, password)
            if (userName && password) {
                const appContainer = document.getElementById("app-container")
                appContainer.innerText = `Registration successful`
                navigate('/') //REPLACE WITH DESIRED PATH???
            }
        } catch (error) {
            console.log('Signup error:', error)
            alert('Error has occured during signup')
        }
    }

    return(
        <div className="app-container" id="app-container">
            {<Header />}
            <div className="input-container">
                <input 
                    type="text"
                    placeholder="username"
                    value={userName}
                    onChange={event => setUserName(event.target.value)}
                />
                <input 
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>
            <div className="button-container">
                <button onClick={onRegisterClick}>
                    Register
                </button>
            </div>
        </div>
    )
}