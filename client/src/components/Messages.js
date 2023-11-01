import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Messages() {
    const location = useLocation();
    const username = location.state;
    const [accounts, setAccounts] = useState();
    let account = null;

    useEffect(() => {
        fetch('/accounts')
            .then(res => res.json())
            .then(setAccounts)

        for (let i = 0; i < accounts.length; i++){
            if (accounts[i].username === username){
                account = account[i]
            }
        }
    }, [])

    return (
        <div>
            <h1>Messages Page</h1>
            <h3>Welcome {account.firstname} {account.lastname}</h3>
        </div>
    )
}

export default Messages;