import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();
    const [accounts, setAccounts] = useState();
    const [form, setForm] = useState('register');
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        fetch('/accounts')
            .then(res => res.json())
            .then(setAccounts)
    }, [])

    return(
        <div>
            <img className='logo' src={require('../site-images/favicon.png')} alt='Logo' onClick={home} />

            {form === 'login' &&
                <div>
                    <h1 className='login-title' >log-in</h1>

                    <div className='login-container'>
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
                        {errorMsg &&
                            <p>{errorMsg}</p>
                        }
                    </div>

                    <div className='register-login-div' >
                        <label>Need an account?</label>
                        <button onClick={changeAction} >Register</button>
                    </div>
                </div>
            }
            {form === 'register' &&
                <div>
                    <h1 className='login-title' >sign-up</h1>

                    <div className='login-container'>
                        <form onSubmit={handleSubmit}>
                            <label>First Name:</label>
                            <br />
                            <input placeholder='First name' name='firstname' onChange={handleChange} value={formData.firstname} />
                            <br />
                            <label>Last Name:</label>
                            <br />
                            <input placeholder='Last name' name='lastname' onChange={handleChange} value={formData.lastname} />
                            <br />
                            <label>Username:</label>
                            <br />
                            <input placeholder='Username' name='username' onChange={handleChange} value={formData.username} />
                            <br />
                            <label>Password:</label>
                            <br />
                            <input placeholder='Password' type='password' name='password' onChange={handleChange} value={formData.password} />
                            <br />
                            <label>Confirm Password:</label>
                            <br />
                            <input placeholder='Confirm Password' type='password' name='confirm_password' onChange={handleChange} value={formData.confirm_password} />
                            <br />
                            <input type='submit' value='Sign-Up' />
                        </form>
                        {errorMsg &&
                            <p>{errorMsg}</p>
                        }
                    </div>

                    <div className='register-login-div' >
                        <label>Already have an account?</label>
                        <button onClick={changeAction} >Log-In</button>
                    </div>
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
        e.preventDefault();
        let account = null;

        for (let i = 0; i < accounts.length; i++){
            if (accounts[i].username === formData.username && accounts[i].password === formData.password){
                account = accounts[i]
            }
        }

        if (form === 'login'){
            if (account !== null){
                history.push({
                    pathname: '/messages',
                    state: account
                })
            } else {
                setErrorMsg('Either Username or Password is incorrect.')
            }
        } else if (form === 'register'){
            if (account !== null){
                setErrorMsg('Username has been taken.')
            } else if (formData.password !== formData.confirm_password) {
                setErrorMsg('Passwords do not match.')
            } else {
                /*
                fetch('/accounts', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                        firstname: formData.firstname,
                        lastname: formData.lastname
                    })
                })
                */
                setErrorMsg('Account Created!');
            }
        }
    }

    function changeAction(e){
        if (form === 'register'){
            setForm('login');
        } else if (form === 'login') {
            setForm('register')
        }

        setErrorMsg();
        setFormData({});
    }
}

export default Login;