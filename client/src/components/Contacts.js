import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Contacts() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const [friendsInfo, setFriendsInfo] = useState({'messages': [], 'friends': []});
    const [currentFriend, setCurrentFriend] = useState(null);
    const [modals, setModals] = useState({'editProfile': 'inactive', 'addFriend': 'inactive'})

    useEffect(() => {
        fetchData();
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

            {modals.addFriend === 'active' &&
                <div className='modal-container' >
                    <div className='modal-content' >
                        <span className='close-modal' onClick={() => setModals({'editProfile': 'inactive', 'addFriend': 'inactive'})} >&times;</span>
                        <h1>Add Friend</h1>
                    </div>
                </div>
            }

            {modals.editProfile === 'active' &&
                <div className='modal-container' >
                    <div className='modal-content' >
                        <span className='close-modal' onClick={() => setModals({'editProfile': 'inactive', 'addFriend': 'inactive'})} >&times;</span>
                        <h1>Edit Profile   </h1>
                    </div>
                </div>
            }
        </div>
    )

    function handleNavClick(e){
        if (e.target.name[0] === '/'){
            history.push({
                pathname: e.target.name,
                state: [account]
            })
        } else if (e.target.name === 'add'){
            setModals({'editProfile': 'inactive', 'addFriend': 'active'})
        } else if (e.target.name === 'edit'){
            setModals({'editProfile': 'active', 'addFriend': 'inactive'})
        }
    }

    function fetchData(){
        let temp_accounts = [];
        const temp_messages = [];
        const temp_friends = [];

        fetch('/accounts')
            .then(res => res.json())
            .then(res => {
                temp_accounts = [...res]

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
                        setCurrentFriend(temp_friends[0]);
                    });
            })
    }
}

export default Contacts;