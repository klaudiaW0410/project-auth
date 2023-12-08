import { userStore } from '../stores/userStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'

import './sign-in-page.css'

export const SignInPage = () => {

    const [ userName, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

    //Function that handles click of login-button
    const storeHandleLogin = userStore((state) => (state.handleLogin))

    const onLoginClick = async () => {
        if (!userName || !password) {
            alert('Please enter username and password')
            return
        }
        try {
            await storeHandleLogin(userName, password)
            const isLoggedIn = userStore.getState().isLoggedIn

            if(isLoggedIn) {
                navigate('/tasks')
            }
            //Additional logic after succesful login can be added
        } catch (error) {
            console.log('Loggin error:', error)
            alert('An error occurred during login')
        }
    }

    return(
        <div className="app-container">
            {<Header />}
            <div className="input-container">
                <input 
                    type='text' 
                    placeholder='username'
                    value = { userName }
                    onChange = { event => setUserName(event.target.value)}
                    />
                <input 
                    type='password' 
                    placeholder='password'
                    value = { password }
                    onChange = { event => setPassword(event.target.value) }
                    />
            </div>
            <div className="button-container">
                <button onClick={onLoginClick}>
                Log in
                </button>
            </div>
        </div>
    )
}