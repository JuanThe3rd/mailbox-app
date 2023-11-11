import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Messages() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const accounts = location.state[1];
    let current_friend = location.state[2];
    const [friendsInfo, setFriendsInfo] = useState({'connections': [], 'friends': []});

    useEffect(() => {
        const temp_connections = [];
        const temp_friends = [];

        fetch('/friendships')
            .then(res => res.json())
            .then(friendships => {
                for (let i = 0; i < friendships.length; i++){
                    if (friendships[i].sender_id === account.id){
                        temp_connections.push(friendships[i]);

                        for(let j = 0; j < accounts.length; j++){
                            if (friendships[i].receiver_id === accounts[j].id){
                                temp_friends.push(accounts[j]);
                            };
                        };
                    } else if (friendships[i].receiver_id === account.id){
                        temp_connections.push(friendships[i]);

                        for(let j = 0; j < accounts.length; j++){
                            if (friendships[i].sender_id === accounts[j].id){
                                temp_friends.push(accounts[j]);
                            };
                        };
                    };
                };

                setFriendsInfo({'connections': temp_connections, 'friends': temp_friends});
            });
    }, []);

    if (current_friend === undefined){
        current_friend = friendsInfo.friends[0];
    }

    return (
        <div>
            <div className='navbar-container' >
                <img className='nav-logo' alt='Logo' src={require('../site-images/favicon.png')} name='/messages' onClick={handleNavClick} />
                <div className='nav-btns-container'>
                    <button className='nav-btn' name='/contacts' onClick={handleNavClick}>Contacts</button>
                    <button className='nav-btn' name='/login' onClick={handleNavClick}>Log-Out</button>
                </div>
            </div>

            <div className='messages-main-content'>
                <div className='contacts-container'>
                    <div className='contacts-title'>
                        <h3>Contacts</h3>
                    </div>
                    {friendsInfo.friends.map((friend) => (
                        <div className='contact-container' key={friend.id} onClick={(e) => changeChat(friend)}>
                            <p>{friend.firstname}</p>
                        </div>
                    ))}
                </div>

                <div className='chat-container'>
                    <h1>{current_friend.firstname}</h1>
                </div>
            </div>
        </div>
    )

    function handleNavClick(e){
        history.push({
            pathname: e.target.name,
            state: [account, accounts]
        })
    }

    function changeChat(friend){
        history.push({
            pathname: '/messages',
            state: [account, accounts, friend]
        })
    }
}

export default Messages;