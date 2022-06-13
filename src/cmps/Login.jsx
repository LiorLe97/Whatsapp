import { Button } from '@mui/material'
import React, { useState } from 'react'
import '../css/login.css'
import { auth, provider } from '../firebase'
import { actionTypes } from '../reducer'
import { useStateValue } from '../Stateprovider'

function Login() {
    const [{ }, dispatch] = useStateValue();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, setSignUp] = useState(true);
    const signInWithGoogle = async () => {
        try {
            const result = await auth.signInWithPopup(provider)
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user.multiFactor.user,
            })
        }
        catch (err) {
            alert(err.message)
        }
    }

    const signUpWhatsapp = (e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.SET_USER,
            user: {
                displayName: username,
                password,
                photoURL:'',
            }
        })
        setUserName('');
        setPassword('');
    }
    return (
        <div className='login'>
            {!signUp && <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="" />
                <div className="login-text">
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button onClick={signInWithGoogle}>
                    Sign in with Google
                </Button>
                <p onClick={()=>setSignUp(true)}>Dont have a google account ? Sign Up</p>
            </div>}
            {signUp && <form className="sign-up">
                <h3>Sign up to whatsapp</h3>
                <input type="text" className="username" onChange={(e) => setUserName(e.target.value)} placeholder='Enter username' />
                <input type="password" className="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                <button onClick={signUpWhatsapp}>Sign Up</button>
                <p onClick={()=>setSignUp(false)}>I want to sign in with google</p>
            </form>}
        </div>
    )
}

export default Login