import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Contacts() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const accounts = location.state[1];
    const [friendsInfo, setFriendsInfo] = useState({'messages': [], 'friends': []});
    const [currentFriend, setCurrentFriend] = useState(null);

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
                                if (!temp_friends.includes(accounts[j])){
                                    temp_friends.push(accounts[j]);
                                }
                            };
                        };
                    } else if (messages[i].receiver_id === account.id){
                        temp_messages.push(messages[i]);

                        for(let j = 0; j < accounts.length; j++){
                            if (messages[i].sender_id === accounts[j].id){
                                if (!temp_friends.includes(accounts[j])){
                                    temp_friends.push(accounts[j]);
                                }
                            };
                        };
                    };
                };

                setFriendsInfo({'messages': temp_messages, 'friends': temp_friends});
                setCurrentFriend(temp_friends[0]);
            });
    }, []);

    return(
        <div>
            <div className='navbar-container' >
                <img className='nav-logo' alt='Logo' src={require('../site-images/favicon.png')} name='/messages' onClick={handleNavClick} />
                <div className='nav-btns-container'>
                    <button className='nav-btn' name='add' onClick={handleNavClick}>Add Friend</button>
                    <button className='nav-btn' name='edit' onClick={handleNavClick}>Edit Profile</button>
                    <button className='nav-btn' name='/login' onClick={handleNavClick}>Log-Out</button>
                </div>
            </div>

            <div className='messages-main-content'>
                <div className='contacts-container'>
                    <div className='contacts-title'>
                        <h3>Contacts</h3>
                    </div>
                    <div className='contacts' >
                        {friendsInfo.friends.map((friend) => (
                            <div className='contact-container' id={friend.id} key={friend.id} onClick={() => setCurrentFriend(friend)}>
                                <p>{friend.firstname}</p>
                            </div>
                        ))}
                    </div>
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
}

export default Contacts;