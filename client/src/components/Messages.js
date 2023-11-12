import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Messages() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const accounts = location.state[1];
    const [friendsInfo, setFriendsInfo] = useState({'connections': [], 'friends': []});
    const [currentChat, setCurrentChat] = useState({'friend': null, 'connection': null});

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
                setCurrentChat({'friend': temp_friends[0], 'connection': temp_connections[0]});
            });
    }, []);

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
                
                {currentChat.friend !== null &&
                    <div className='chat-section' >
                        <h1 className='chat-contact-name'>{currentChat.friend.firstname} {`${currentChat.friend.lastname[0]}.`}</h1>

                        <div className='messages-container'>

                        </div>

                        <div className='send-message-container'>
                            <textarea className='message-to-send' type='text'></textarea>
                            <img className='send-message-btn' alt='Send' src={require('../site-images/send-message.png')} />
                        </div>
                    </div>
                }
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
        let temp_connection = null;

        for(let i = 0; i < friendsInfo.connections.length; i++){
            if ((friendsInfo.connections[i].receiver_id === account.id && friendsInfo.connections[i].sender_id === friend.id) || (friendsInfo.connections[i].receiver_id === friend.id && friendsInfo.connections[i].sender_id === account.id)){
                temp_connection = friendsInfo.connections[i];
            }
        }

        setCurrentChat({'friend': friend, 'connection': temp_connection});
    }
}

export default Messages;