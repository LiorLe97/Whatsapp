import React, { useState, useEffect } from 'react';
import db from '../firebase'
import '../css/side-bar.css';
import SidebarChat from './Sidebarchat';
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useStateValue } from '../Stateprovider';


function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
        ))
    }, [])
    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} referrerPolicy="no-referrer"/>
                <div className="sidebar-header-right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Search or start a new chat' />
                </div>
            </div>

            <div className="sidebar-chats">
                <SidebarChat addNewChat />
                {rooms.map(room=>{
                     return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                })}
            </div>

        </div>
    )
}
export default Sidebar;