import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen flex flex-col p-6'>
        {/* Logo Section */}
        <div className="flex justify-center sm:justify-start mb-10">
            <img src={assets.logo} className='w-[max(10vw,100px)] hidden sm:block' alt='Logo' />
            <img src={assets.logo_small} className='w-[max(5vw,40px)] sm:hidden block' alt='Small Logo' />
        </div>

        {/* Sidebar Navigation */}
        <div className='flex flex-col gap-6'>
            <NavLink to='/add-song' className='flex items-center gap-3 text-gray-200 hover:text-white bg-[#006d2f] p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105'>
                <img src={assets.add_song} className='w-6' alt='' />
                <p className='hidden sm:block text-sm font-medium'>Add Song</p>
            </NavLink>

            <NavLink to='/list-song' className='flex items-center gap-3 text-gray-200 hover:text-white bg-[#006d2f] p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105'>
                <img src={assets.song_icon} className='w-6' alt='' />
                <p className='hidden sm:block text-sm font-medium'>List Song</p>
            </NavLink>

            <NavLink to='/add-album' className='flex items-center gap-3 text-gray-200 hover:text-white bg-[#006d2f] p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105'>
                <img src={assets.add_album} className='w-6' alt='' />
                <p className='hidden sm:block text-sm font-medium'>Add Album</p>
            </NavLink>

            <NavLink to='/list-album' className='flex items-center gap-3 text-gray-200 hover:text-white bg-[#006d2f] p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105'>
                <img src={assets.album_icon} className='w-6' alt='' />
                <p className='hidden sm:block text-sm font-medium'>List Album</p>
            </NavLink>
        </div>
    </div>
  );
};

export default Sidebar;
