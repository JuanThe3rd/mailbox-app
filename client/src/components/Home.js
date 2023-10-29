import React from 'react';

function Home() {
    return (
        <div className='home-page' >
            <div className='log-in-btn-container' >
                <button className='log-in-btn' >Sign-Up/Log-In</button>
            </div>

            <h1>Mail-Box</h1>
            <img className='home-logo' alt='logo' src='https://www.freeiconspng.com/thumbs/message-icon-png/message-icon-png-2.png' />

            <div className='grid-container' >
                <div className='left-column' >
                    <h3>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec felis nisi. Pellentesque et urna sed tellus vulputate maximus id semper diam. Curabitur placerat lectus id nunc mattis vulputate. Vivamus ut aliquam risus. Maecenas nec libero viverra, feugiat dui pellentesque, molestie quam. Sed placerat mattis mattis. Nulla facilisi. Nulla bibendum metus ac eros sagittis, et maximus lectus facilisis. Phasellus a velit eu mi consectetur bibendum. Donec varius molestie nisl, eu suscipit lorem volutpat sit amet. Vivamus pretium diam at velit tincidunt, nec rutrum neque fringilla. In aliquet egestas arcu. Nunc urna tellus, vehicula posuere sapien vel, vestibulum tempus purus. Praesent vestibulum pharetra suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div className='right-column' >
                    <h3>Contact Us</h3>
                    <img className='icon' alt='phone' src='https://static.vecteezy.com/system/resources/previews/019/923/706/original/telephone-and-mobile-phone-icon-calling-icon-transparent-background-free-png.png' />
                    <p>(555) 555-555</p>

                    <img className='icon' alt='email' src='https://static-00.iconduck.com/assets.00/email-icon-2048x2048-iz8kl1eg.png' />
                    <p>loremipsum@gmail.com</p>

                    <img className='icon' alt='linkedin' src='https://cdn-icons-png.flaticon.com/512/174/174857.png' />
                    <p>https://test.com/123</p>
                </div>
            </div>
        </div>
    )
}

export default Home;