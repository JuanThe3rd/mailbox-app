import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Messages() {
    const location = useLocation();
    const account = location.state[0];

    return (
        <div>
            <h1>Messages Page</h1>
            <h3>Welcome {account.firstname} {account.lastname}</h3>
        </div>
    )
}

export default Messages;