import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

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
                    <h1 className='login-title' >Log-In</h1>

                    <div className='login-container'>
                        <form onSubmit={handleSubmit}>
                            <div className='login-input-group'>
                                <input className='login-input' required type='text' id='username' name='username' onChange={handleChange} value={formData['username']} />
                                <label className='login-label' for='username'>Username</label>
                            </div>
                            <div className='login-input-group'>
                                <input className='login-input' required type='password' id='password' name='password' onChange={handleChange} value={formData['password']} />
                                <label className='login-label' for='password'>Password</label>
                            </div>
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
                    <h1 className='register-title' >Sign-Up</h1>

                    <div className='login-container'>
                        <form onSubmit={handleSubmit}>
                            <div className='login-input-group'>
                                <input className='login-input' required type='text' id='firstname' name='firstname' onChange={handleChange} value={formData.firstname} />
                                <label className='login-label' for='firstname' >First Name</label>
                            </div>

                            <div className='login-input-group'>
                                <input className='login-input' required type='text' id='lastname' name='lastname' onChange={handleChange} value={formData.lastname} />
                                <label className='login-label' for='lastname'>Last Name</label>
                            </div>
                            
                            <div className='login-input-group'>
                                <input className='login-input' required type='text' id='user_name' name='username' onChange={handleChange} value={formData.username} />
                                <label className='login-label' for='user_name'>Username</label>
                            </div>
                            
                            <div className='login-input-group'>
                                <input className='login-input' required type='password' id='pass_word' name='password' onChange={handleChange} value={formData.password} />
                                <label className='login-label' for='pass_word'>Password</label>
                            </div>
                            
                            <div className='login-input-group'>
                                <input className='login-input' required type='password' id='confirm_password' name='confirm_password' onChange={handleChange} value={formData.confirm_password} />
                                <label className='login-label' for='confirm_password'>Confirm Password</label>
                            </div>
                            
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
            const temp_accounts = [...accounts];

            if (account !== null){
                history.push({
                    pathname: '/messages',
                    state: [account, temp_accounts]
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