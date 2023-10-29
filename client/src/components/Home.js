import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();

    return (
        <div className='home-page' >
            <div className='log-in-btn-container' >
                <button className='log-in-btn' onClick={login} >Sign-Up/Log-In</button>
            </div>

            <div className='logo-container' >
                <img className='home-logo' src={require('../site-images/logo.png')} alt='Logo' onClick={home} />
                
                <div className='home-title-container' >
                    <h2>Welcome!</h2>
                </div>
            </div>

            <div className='home-info'>
                <div className='about' >
                    <h3>about</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec felis nisi. Pellentesque et urna sed tellus vulputate maximus id semper diam. Curabitur placerat lectus id nunc mattis vulputate. Vivamus ut aliquam risus. Maecenas nec libero viverra, feugiat dui pellentesque, molestie quam. Sed placerat mattis mattis. Nulla facilisi. Nulla bibendum metus ac eros sagittis, et maximus lectus facilisis. Phasellus a velit eu mi consectetur bibendum. Donec varius molestie nisl, eu suscipit lorem volutpat sit amet. Vivamus pretium diam at velit tincidunt, nec rutrum neque fringilla. In aliquet egestas arcu. Nunc urna tellus, vehicula posuere sapien vel, vestibulum tempus purus. Praesent vestibulum pharetra suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div className='socials' >
                    <h3>contact us</h3>
                    <p><img className='icon' alt='phone' src='https://static.vecteezy.com/system/resources/previews/019/923/706/original/telephone-and-mobile-phone-icon-calling-icon-transparent-background-free-png.png' /> (555) 555-5555 </p>

                    <p><img className='icon' alt='email' src='https://static-00.iconduck.com/assets.00/email-icon-2048x2048-iz8kl1eg.png' /> loremipsum@gmail.com</p>

                    <p><img className='icon' alt='linkedin' src='https://cdn-icons-png.flaticon.com/512/174/174857.png' /> https://test.com/123</p>
                </div>
            </div>
        </div>
    )

    function login(e){
        history.push({
            pathname: '/login'
        })
    }

    function home(e){
        history.push({
            pathanem: '/'
        })
    }
}

export default Home;