import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Contacts() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state[0];
    const [errorMsg, setErrorMsg] = useState(null);
    const [friendsInfo, setFriendsInfo] = useState({'messages': [], 'friends': []});
    const [currentFriend, setCurrentFriend] = useState(null);
    const [modals, setModals] = useState({'editProfile': 'inactive', 'addFriend': 'inactive'})
    const [inputData, setInputData] = useState({});

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
                        <h3>Contacts ({friendsInfo.friends.length})</h3>
                    </div>
                    <div className='contacts' >
                        {friendsInfo.friends.map((friend) => (
                            <div className='contact-container' id={friend.id} key={friend.id} onClick={() => setCurrentFriend(friend)}>
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
                    <div className='profile-container'>
                        <div className='profile-header-container'>
                            <div className='profile-header-title'>
                                {currentFriend.profile_pic === null &&
                                    <img alt='profile pic' className='profile-pic' src={require('../site-images/anon-user.png')} />
                                }
                                {currentFriend.profile_pic !== null &&
                                    <img alt='profile pic' className='profile-pic' src={currentFriend.profile_pic} />
                                }
                                <h1 className='profile-name'>{currentFriend.firstname} {currentFriend.middlename} {currentFriend.lastname}</h1>
                            </div>

                            <div className='profile-content-buttons'>
                                <button className='profile-btn' onClick={messageFriend} >Message</button>
                                <br />
                                <button className='profile-btn' onClick={removeFriend} >Remove Friend</button>
                            </div>
                        </div>

                        <div className='profile-content-container'>
                            <p>Username: {currentFriend.username}</p>
                            {currentFriend.dob === null &&
                                <div>
                                    <p>DOB: 00/00/0000</p>
                                </div>
                            }
                            {currentFriend.dob !== null &&
                                <div>
                                    <p>DOB: {currentFriend.dob}</p>
                                </div>
                            }
                            {currentFriend.phone_number === null &&
                                <div>
                                    <p>Phone Number: (000) 000-0000</p>
                                </div>
                            }
                            {currentFriend.phone_number !== null &&
                                <div>
                                    <p>Phone Number: {currentFriend.phone_number}</p>
                                </div>
                            }
                            {currentFriend.about_me !== null &&
                                <div>
                                    <p>About Me: {currentFriend.about_me}</p>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>

            {modals.addFriend === 'active' &&
                <div className='modal-container' >
                    <div className='add-modal-content' >
                        <span className='close-modal' onClick={() => setModals({'editProfile': 'inactive', 'addFriend': 'inactive'})} >&times;</span>
                        <h1 className='modal-title' >Add Friend</h1>
                        {errorMsg !== null &&
                            <div className='error-msg'>
                                <p>{errorMsg}</p>
                            </div>
                        }
                        <div className='login-input-group' >
                            <input className='login-input' required type='text' id='username' name='friend-user' onChange={handleChange} />
                            <label className='login-label' for='username'>Username</label>
                        </div>
                        <button className='login-submit-btn' onClick={addFriend} >Add</button>
                    </div>
                </div>
            }

            {modals.editProfile === 'active' &&
                <div className='modal-container' >
                    <div className='edit-modal-content' >
                        <span className='close-modal' onClick={() => setModals({'editProfile': 'inactive', 'addFriend': 'inactive'})} >&times;</span>
                        <h1 className='modal-title' >Edit Profile</h1>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='username' name='username' onChange={handleChange} />
                            <label className='modal-label' for='username'>Username</label>
                        </div>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='firstname' name='firstname' onChange={handleChange} />
                            <label className='login-label' for='firstname'>First Name</label>
                        </div>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='middlename' name='middlename' onChange={handleChange} />
                            <label className='modal-label' for='middlename'>Middle Name</label>
                        </div>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='lastname' name='lastname' onChange={handleChange} />
                            <label className='modal-label' for='lastname'>Last Name</label>
                        </div>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='profile_pic' name='profile_pic' onChange={handleChange} />
                            <label className='login-label' for='profile_pic'>Profile Picture URL</label>
                        </div>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='dob' name='dob' onChange={handleChange} />
                            <label className='modal-label' for='dob'>Date of Birth</label>
                        </div>
                        <div className='modal-input-group' >
                            <input className='modal-input' required type='text' id='phone_number' name='phone_number' onChange={handleChange} />
                            <label className='modal-label' for='phone_number'>Phone Number</label>
                        </div>
                        <button className='login-submit-btn' onClick={updateProfile} >Add</button>
                    </div>
                </div>
            }
        </div>
    )

    function handleChange(e){
        setInputData({...inputData, [e.target.name]: e.target.value})
    }

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

    function updateProfile(){
        fetch(`/accounts${account.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputData)
        })

        setInputData({});
    }

    function addFriend(){
        fetch('/accounts')
            .then(res => res.json())
            .then(temp_accounts => {
                let friend_account = null;
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

                for (let i = 0; i < temp_accounts.length; i++){
                    if (temp_accounts[i].username === inputData['friend-user']){
                        friend_account = temp_accounts[i];
                    }
                }

                if (friend_account !== null){
                    fetch('/messages', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            content: `${account.firstname} ${account.lastname} wants to be your friend!`,
                            sender_id: account.id,
                            receiver_id: friend_account.id,
                            sent_timestamp: converted_timestamp,
                            read_timestamp: null,
                            seen: false
                        })
                    })

                    fetchData();
                    setModals({'editProfile': 'inactive', 'addFriend': 'inactive'});
                    setInputData({});
                } else {
                    setErrorMsg('Username not found!');

                    setTimeout(() => {
                        setErrorMsg(null);
                    }, 2000)
                }
            })
    }

    function messageFriend(){

    }

    function removeFriend(){
        fetch(`/messages${currentFriend.id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(deletedMessage => {

            })
    }

    function fetchData(){
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
                        setCurrentFriend(temp_friends[0]);
                    });
            })
    }
}

export default Contacts;