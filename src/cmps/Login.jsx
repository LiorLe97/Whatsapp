import { Button } from '@mui/material'
import React from 'react'
import '../css/login.css'
import { auth, provider } from '../firebase'
import { actionTypes } from '../reducer'
import { useStateValue } from '../Stateprovider'

function Login() {
    const [{},dispatch] = useStateValue();
     const  signIn = async () => {
         try{
             const result = await auth.signInWithPopup(provider)
             dispatch({
                 type:actionTypes.SET_USER,
                 user:result.user.multiFactor.user,
             })
            }
            catch(err){
                alert(err.message)
            }
    }
    return (
        <div className='login'>
            <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="" />
                <div className="login-text">
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login