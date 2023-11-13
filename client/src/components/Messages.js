import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Messages() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const accounts = location.state[1];
    const [friendsInfo, setFriendsInfo] = useState({'messages': [], 'friends': []});
    const [currentFriend, setCurrentFriend] = useState(null);
    const [chat, setChat] = useState(null);

    useEffect(() => {
        const temp_messages = [];
        const temp_friends = [];

        fetch('/messages')
            .then(res => res.json())
            .then(messages => {
                for (let i = 0; i < messages.length; i++){
                    if (messages[i].sender_id === account.id){
                        temp_messages.push(messages[i]);

                        for(let j = 0; j < accounts.length; j++){
                            if (messages[i].receiver_id === accounts[j].id){
                                temp_friends.push(accounts[j]);
                            };
                        };
                    } else if (messages[i].receiver_id === account.id){
                        temp_messages.push(messages[i]);

                        for(let j = 0; j < accounts.length; j++){
                            if (messages[i].sender_id === accounts[j].id){
                                temp_friends.push(accounts[j]);
                            };
                        };
                    };
                };

                setFriendsInfo({'messages': temp_messages, 'friends': temp_friends});
                setCurrentFriend(temp_friends[0]);
            });
    }, []);

    useEffect(() => {
        const temp_chat = [];

        for (let i = 0; i < friendsInfo.messages.length; i++){
            if (friendsInfo.messages[i].sender_id === currentFriend.id || friendsInfo.messages[i].receiver_id === currentFriend.id){
                temp_chat.push(friendsInfo.messages[i]);
            }
        }

        setChat(temp_chat);
    }, [currentFriend])

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
                        <div className='contact-container' key={friend.id} onClick={() => setCurrentFriend(friend)}>
                            <p>{friend.firstname}</p>
                        </div>
                    ))}
                </div>
                { currentFriend !== null &&
                    <div className='chat-section' >
                        <h1 className='chat-contact-name'>{currentFriend.firstname} {`${currentFriend.lastname[0]}.`}</h1>

                        <div className='messages-container'>

                        </div>

                        <div className='send-message-container'>
                            <textarea className='message-to-send' type='text' placeholder='Message' ></textarea>
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
}

export default Messages;