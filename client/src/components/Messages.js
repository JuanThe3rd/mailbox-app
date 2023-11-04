import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Messages() {
    const location = useLocation();
    const account = location.state[0];
    const [accounts, setAccounts] = useState();
    const [friends, setFriends] = useState([]);
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        fetch('/accounts')
            .then(res => res.json())
            .then(setAccounts)

        fetch('/friendships')
            .then(res => res.json())
            .then(friendships => {
                for (let i = 0; i < friendships.length; i++){
                    if (friendships[i].sender_id === account.id || friendships[i].receiver_id === account.id){
                        setConnections([...connections, friendships[i]]);
                    }
                }
            })

        for (let i = 0; i < connections.length; i++){
            for(let j = 0; j < accounts.length; j++){
                if (connections[i].sender_id === account.id){
                    if (connections[i].receiver_id === accounts[j].id){
                        setFriends([...friends, accounts[j]])
                    }
                } else {
                    if (connections[i].sender_id === accounts[j].id){
                        setFriends([...friends, accounts[j]])
                    }
                }
            }
        }
    }, [])

    return (
        <div>
            <div className='navbar-container' >
                <img className='nav-logo' alt='Logo' src={require('../site-images/favicon.png')} />
                <div className='nav-btns-container'>
                    <button className='nav-btn'>Contacts</button>
                    <button className='nav-btn'>Log-Out</button>
                </div>
            </div>

            <div className='contacts-container'>
                {friends.map((friend) => (
                    <div className='contact-container'>
                        <h3>{friend.firstname}</h3>
                    </div>
                ))}
            </div>

            <h1>Messages Page</h1>
            <h3>Welcome {account.firstname} {account.lastname}</h3>
        </div>
    )
}

export default Messages;