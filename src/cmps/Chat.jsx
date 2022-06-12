import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/chat.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import db from '../firebase'
import { useStateValue } from '../Stateprovider';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { actionTypes } from '../reducer'


function Chat() {
    const [seed, setSeed] = useState('');
    const [msg, setMsg] = useState('');
    const roomId = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user, status }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId.roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name);
                db.collection('rooms').doc(roomId.roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => {
                        return doc.data()
                    }))
                ))
            })
        }

    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        if (msg === '') return
        db.collection('rooms').doc(roomId.roomId).collection('messages').add({
            name: user.displayName,
            message: msg,
            timestamp: { seconds: Date.now() },
        })
        setMsg('');

    }
    const sidebarStatus = () => {
        dispatch({
            type: actionTypes.SET_STATUS,
            status: true,
        })
        console.log(status)
    }
    return (
        <div className='chat'>
            <div className="chat-header">
                <KeyboardReturnIcon className='return' onClick={sidebarStatus} />
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-header-info">
                    <h3>{roomName}</h3>
                    <p>{messages.length === 0 ? 'Last seen last year ' : `Last seen at ${new Date(messages[messages.length - 1]?.timestamp.seconds).getHours()}:${new Date(messages[messages.length - 1]?.timestamp.seconds).getMinutes()}`}</p>
                </div>
                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message) => {
                    return (
                        <p className={`chat-msg ${message.name === user.displayName && "chat-reciever"}`}>
                            <span className='chat-name'>{message.name}</span>
                            {message.message}
                            <span className='chat-time'>{`${new Date(message.timestamp.seconds).getHours()}:${new Date(message.timestamp.seconds).getMinutes()}`}</span>
                        </p>
                    )
                })}

            </div>
            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" placeholder='Type a message' />
                    <button onClick={sendMessage} type='submit'><SendIcon /></button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat