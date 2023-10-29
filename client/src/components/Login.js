import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();
    const [form, setForm] = useState('register');
    const [formData, setFormData] = useState({})

    console.log(formData)

    return(
        <div>
            <img className='logo' src={require('../site-images/favicon.png')} alt='Logo' onClick={home} />
            
            <h1 className='login-title' >Login Page</h1>
            <div className='login-container'>
                {form === 'login' && 
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <br />
                        <input placeholder='Username' name='username' onChange={handleChange} value={formData['username']} />
                        <br />
                        <label>Password:</label>
                        <br />
                        <input placeholder='Password' type='password' name='password' onChange={handleChange} value={formData['password']} />
                        <br />
                        <input type='Submit' value='Log-In' />
                    </form>
                }
                {form === 'register' &&
                    <form onSubmit={handleSubmit}>
                        
                    </form>
                }
            </div>
            {form === 'register' &&
                <div>
                    <label>Already have an account?</label>
                    <button onClick={() => setForm('login')} >Log-In</button>
                </div>
            }
            {form === 'login' &&
                <div>
                    <label>Need an account?</label>
                    <button onClick={() => setForm('register')} >Register</button>
                </div>
            }
        </div>
    )

    function home(){
        history.push({
            pathname: '/'
        })
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        if (form === 'login'){
            /*
                Make get request to validate login form data is in db.
            */
        } else if (form === 'register'){
            /*
                Make post request to push new form data into db.
            */
        }
    }
}

export default Login;