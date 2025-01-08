import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route} from 'react-router-dom'
import AddSong from './pages/AddSong'
import AddAlbum from './pages/AddAlbum'
import ListAlbum from './pages/ListAlbum'
import ListSong from './pages/ListSong'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Edit from './components/Edit';

export const url = 'https://spotify-backend-xi.vercel.app/';


const App = () => {
  return (
    <div>
      <div className='flex items-start min-h-screen'>
        <ToastContainer />
        <Sidebar />
        <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
          {/* <Navbar /> */}
          <div className='pt-8 p1-5 sm:pt-12 sm:pl-12'>
            <Routes>
              <Route path='/add-song' element={<AddSong />} />
              <Route path='/add-album' element={<AddAlbum />} />
              <Route path='/list-song' element={<ListSong />} />
              <Route path='/edit/:id' element={<Edit /> } />
              <Route path='/list-album' element={<ListAlbum />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
