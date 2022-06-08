import './App.css';
import { useState } from 'react';
import Sidebar from './cmps/Sidebar';
import Chat from './cmps/Chat'
import Login from './cmps/Login'
import { Route, Routes } from 'react-router-dom'
import { useStateValue } from './Stateprovider';

function App() {

  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className='app-body'>
          <Sidebar />
          <Routes>
            <Route path='/rooms/:roomId' element={<Chat />} />
          </Routes>
        </div>
      )
      }
    </div>
  );
}

export default App;
