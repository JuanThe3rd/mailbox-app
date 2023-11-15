import React from 'react';

function MessageBubble({message, account}){
    return (
        <div>
            {message.sender_id === account.id &&
                <div className='sent-message-wrapper' >
                    <div className='sent-message-bubble' >
                        {message.content}
                    </div>
                </div>
            }
            {message.receiver_id === account.id &&
                <div className='received-message-wrapper' >
                    <div className='received-message-bubble' >
                        {message.content}
                    </div>
                </div>
            }
        </div>
    )
}

export default MessageBubble;