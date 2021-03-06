import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import '../css/sidebar-chat.css'
import db from '../firebase';
import { Link } from 'react-router-dom';
function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMessages(snapshot.docs.map(doc => {
            return doc.data();
        })))
    }, [id])



    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))

    }, [])

    const createChat = () => {
        const roomName = prompt('Please enter a name for the chat')
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebar-chat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebar-chat-info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebar-chat" onClick={createChat}>
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat