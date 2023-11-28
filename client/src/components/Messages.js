import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Messages() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const friend_from_contacts = location.state[1];
    const [friendsInfo, setFriendsInfo] = useState({'messages': [], 'friends': []});
    const [currentFriend, setCurrentFriend] = useState(null);
    const [chat, setChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const temp_chat = [];

        for (let i = 0; i < friendsInfo.messages.length; i++){
            if (friendsInfo.messages[i].sender_id === currentFriend.id || friendsInfo.messages[i].receiver_id === currentFriend.id){
                temp_chat.push(friendsInfo.messages[i]);
            }
        }

        const timestamp = new Date().toString().slice(4, 21);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month_num = months.indexOf(timestamp.slice(0, 3)) + 1;
        let converted_timestamp = `${month_num}/${timestamp.slice(4, 6)}/${timestamp.slice(7, 11)}`;

        if (parseInt(timestamp.slice(12, 14)) <= 11){
            converted_timestamp = converted_timestamp + timestamp.slice(12) + ' AM';
        } else if (parseInt(timestamp.slice(12, 14)) == 12){
            converted_timestamp = converted_timestamp + timestamp.slice(12) + ' PM';
        } else {
            converted_timestamp = `${converted_timestamp} ${parseInt(timestamp.slice(12, 14)) - 12}:${timestamp.slice(15)} PM`;
        }

        if (temp_chat.length > 0){
            if (temp_chat[temp_chat.length - 1].seen === false && temp_chat[temp_chat.length - 1].receiver_id === account.id){
                fetch(`/messages/${temp_chat[temp_chat.length - 1].id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        read_timestamp: converted_timestamp
                    })
                })

                fetch(`/messages/${temp_chat[temp_chat.length - 1].id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        seen: true
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        const temp_messages = friendsInfo.messages;
                        temp_messages.pop();
                        temp_messages.push(res);

                        setFriendsInfo({'messages': temp_messages, 'friends': friendsInfo.friends});
                        setChat(temp_messages.reverse());
                    })
            }
        }

        setChat(temp_chat.reverse());
    }, [currentFriend]);

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
                        <h3>Contacts ({friendsInfo.friends.length})</h3>
                    </div>
                    <div className='contacts' >
                        {friendsInfo.friends.map((friend) => (
                            <div className='contact-container' id={friend.id} key={friend.id} onClick={() => changeFriend(friend)}>
                                {currentFriend.id === friend.id &&
                                    <div>
                                        <p>{friend.firstname} {friend.lastname[0]}.</p>
                                        <div className='active-contact-icon-container'>
                                            <img className='active-contact-icon' alt='active-contact' src='https://cdn-icons-png.flaticon.com/512/44/44607.png' />
                                        </div>
                                    </div>
                                }
                                {currentFriend.id !== friend.id &&
                                    <p>{friend.firstname} {friend.lastname[0]}.</p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
                {currentFriend !== null &&
                    <div className='chat-section' >
                        <h1 className='chat-contact-name'>{currentFriend.firstname} {`${currentFriend.lastname[0]}.`}</h1>
                        <div className='messages-container' id='chat-div' >
                            {chat.map((message) => (
                                <div>
                                    {message.sender_id === account.id &&
                                        <div>
                                            <div className='sent-message-wrapper' >
                                                <div className='sent-message-bubble' >
                                                    {message.content}
                                                </div>
                                            </div>
                                            {message === chat[0] &&
                                                <div className='sent-message-label'>
                                                    {message.seen === false && message.sent_timestamp !== null &&
                                                        <p>Sent {message.sent_timestamp.slice(11)}</p>
                                                    }
                                                    {message.seen === true && message.read_timestamp !== null &&
                                                        <p>Read {message.read_timestamp.slice(10)}</p>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                    {message.receiver_id === account.id &&
                                        <div>
                                            <div className='received-message-wrapper' >
                                                <div className='received-message-bubble' >
                                                    {message.content}
                                                </div>
                                            </div>
                                            {message === chat[0] &&
                                                <div className='received-message-label'>
                                                    {message.seen === false && message.sent_timestamp !== null &&
                                                        <p>Sent {message.sent_timestamp.slice(11)}</p>
                                                    }
                                                    {message.seen === true &&  message.read_timestamp !== null &&
                                                        <p>Read {message.read_timestamp.slice(10)}</p>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>

                        <div className='send-message-container'>
                            <textarea className='message-to-send' type='text' placeholder='Message' onChange={handleChange} value={newMessage} ></textarea>
                            <img className='send-message-btn' alt='Send' src={require('../site-images/send-message.png')} onClick={sendMessage} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )

    function handleNavClick(e){
        history.push({
            pathname: e.target.name,
            state: [account]
        })
    }

    function changeFriend(friend){
        setCurrentFriend(friend);
    }

    function handleChange(e){
        setNewMessage(e.target.value)
    }

    function sendMessage(e){
        const timestamp = new Date().toString().slice(4, 21);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month_num = months.indexOf(timestamp.slice(0, 3)) + 1;
        let converted_timestamp = `${month_num}/${timestamp.slice(4, 6)}/${timestamp.slice(7, 11)} `;

        if (parseInt(timestamp.slice(12, 14)) <= 11){
            converted_timestamp = converted_timestamp + timestamp.slice(12) + ' AM';
        } else if (parseInt(timestamp.slice(12, 14)) == 12){
            converted_timestamp = converted_timestamp + timestamp.slice(12) + ' PM';
        } else {
            converted_timestamp = `${converted_timestamp} ${parseInt(timestamp.slice(12, 14)) - 12}:${timestamp.slice(15)} PM`;
        }

        if (newMessage !== ''){
            fetch('/messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    content: newMessage,
                    sender_id: account.id,
                    receiver_id: currentFriend.id,
                    sent_timestamp: converted_timestamp,
                    read_timestamp: null,
                    seen: false
                })
            })
                .then(res => res.json())
                .then(new_message => {
                    const new_chat = [...chat];
                    new_chat.unshift(new_message);
                    setChat(new_chat);
                    setNewMessage('');
                })
        }
    }

    function fetchData(change_friend=true){
        const temp_messages = [];
        const temp_friends = [];

        fetch('/accounts')
            .then(res => res.json())
            .then(temp_accounts => {
                fetch('/messages')
                    .then(res => res.json())
                    .then(messages => {
                        for (let i = 0; i < messages.length; i++){
                            if (messages[i].sender_id === account.id){
                                temp_messages.push(messages[i]);

                                for(let j = 0; j < temp_accounts.length; j++){
                                    if (messages[i].receiver_id === temp_accounts[j].id){
                                        if (!temp_friends.includes(temp_accounts[j])){
                                            temp_friends.push(temp_accounts[j]);
                                        }
                                    };
                                };
                            } else if (messages[i].receiver_id === account.id){
                                temp_messages.push(messages[i]);

                                for(let j = 0; j < temp_accounts.length; j++){
                                    if (messages[i].sender_id === temp_accounts[j].id){
                                        if (!temp_friends.includes(temp_accounts[j])){
                                            temp_friends.push(temp_accounts[j]);
                                        }
                                    };
                                };
                            };
                        };

                        for (let i = 0; i < temp_friends.length; i++){
                            for (let j = 0; j < (temp_friends.length - i - 1); j++){
                                if (temp_friends[j].firstname > temp_friends[j + 1].firstname){
                                    let temp = temp_friends[j];
                                    temp_friends[j] = temp_friends[j + 1];
                                    temp_friends[j + 1] = temp;
                                }
                            }
                        }

                        setFriendsInfo({'messages': temp_messages, 'friends': temp_friends});

                        if (change_friend){
                            if (friend_from_contacts === undefined){
                                setCurrentFriend(temp_friends[0]);
                            } else {
                                setCurrentFriend(friend_from_contacts);
                            }
                        }
                    });
            })
    }
}

export default Messages;