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
            .then(res => {
                setAccounts(() => res);
            })
    }, [])

    return(
        <div className='login-page'>
            <img className='logo' src={require('../site-images/favicon.png')} alt='Logo' onClick={home} />

            {form === 'login' &&
                <div>
                    <h1 className='login-title' >log-in</h1>

                    <div className='login-container'>
                        <form onSubmit={handleSubmit}>
                            <label className='login-label'>Username:</label>
                            <br />
                            <input className='login-input' placeholder='Username' name='username' onChange={handleChange} value={formData['username']} />
                            <br />
                            <label className='login-label'>Password:</label>
                            <br />
                            <input className='login-input' placeholder='Password' type='password' name='password' onChange={handleChange} value={formData['password']} />
                            <br />
                            <input className='login-submit-btn' type='Submit' value='Log-In' />
                        </form>
                        {errorMsg &&
                            <p>{errorMsg}</p>
                        }
                    </div>

                    <div className='register-login-div' >
                        <label>Need an account?</label>
                        <button className='change-form-btn' onClick={changeAction} >Sign-Up</button>
                    </div>
                </div>
            }
            {form === 'register' &&
                <div>
                    <h1 className='login-title' >sign-up</h1>

                    <div className='login-container'>
                        <form onSubmit={handleSubmit}>
                            <label className='login-label'>First Name:</label>
                            <br />
                            <input className='login-input' placeholder='First name' name='firstname' onChange={handleChange} value={formData.firstname} />
                            <br />
                            <label className='login-label'>Last Name:</label>
                            <br />
                            <input className='login-input' placeholder='Last name' name='lastname' onChange={handleChange} value={formData.lastname} />
                            <br />
                            <label className='login-label'>Username:</label>
                            <br />
                            <input className='login-input' placeholder='Username' name='username' onChange={handleChange} value={formData.username} />
                            <br />
                            <label className='login-label'>Password:</label>
                            <br />
                            <input className='login-input' placeholder='Password' type='password' name='password' onChange={handleChange} value={formData.password} />
                            <br />
                            <label className='login-label'>Confirm Password:</label>
                            <br />
                            <input className='login-input' placeholder='Confirm Password' type='password' name='confirm_password' onChange={handleChange} value={formData.confirm_password} />
                            <br />
                            <input className='login-submit-btn' type='submit' value='Sign-Up' />
                        </form>
                        {errorMsg &&
                            <p>{errorMsg}</p>
                        }
                    </div>

                    <div className='register-login-div' >
                        <label>Already have an account?</label>
                        <button className='change-form-btn' onClick={changeAction} >Log-In</button>
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
            if (accounts[i].username === formData.username){
                if (form === 'register'){
                    account = accounts[i];
                }
                else if (form === 'login' && accounts[i].password === formData.password){
                    account = accounts[i];
                }
            }
        }

        if (form === 'login'){
            if (account !== null){
                history.push({
                    pathname: '/messages',
                    state: [account]
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
                    .then(res => res.json())
                    .then(new_account => {
                        setAccounts([...accounts, new_account])
                    })
                
                setForm('login');
                setErrorMsg('Account Created!');
                setFormData({});

                setTimeout(() => {
                    setErrorMsg(null);
                }, 2000)
            }
        }
    }

    function changeAction(e){
        if (form === 'register'){
            setForm('login');
        } else if (form === 'login') {
            setForm('register')
            setFormData({});
        }

        setErrorMsg();
    }
}

export default Login;