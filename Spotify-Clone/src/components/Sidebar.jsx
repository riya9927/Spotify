import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate=useNavigate();
    return (
        
        <div className='w-full md:w-[35%] lg:w-[25%] h-full p-2 flex flex-col gap-2 text-white md:flex hidden'>
            <div className="flex items-center justify-center gap-3 mb-6">
                <img
                    src={assets.spotify_logo}  
                    alt="Spotify Logo"
                    className="w-16 h-16"
                />
                <p className="text-2xl font-bold">Spotify</p>
            </div>

            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-4 md:pl-6 lg:pl-8 cursor-pointer hover:opacity-80 transition-opacity'>
                    <img className='w-5 md:w-6' src={assets.home_icon} alt="" />
                    <p className='font-bold text-sm md:text-base'>Home</p>
                </div>
                <div className='flex items-center gap-3 pl-4 md:pl-6 lg:pl-8 cursor-pointer hover:opacity-80 transition-opacity'>
                    <img className='w-5 md:w-6' src={assets.search_icon} alt="" />
                    <p className='font-bold text-sm md:text-base'>Search</p>
                </div>
            </div>
            <div className='bg-[#121212] h-[85%] rounded'>
                <div className='p-3 md:p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2 md:gap-3'>
                        <img className='w-6 md:w-8' src={assets.stack_icon} alt='' />
                        <p className='font-semibold text-sm md:text-base'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-2 md:gap-3'>
                        <img className='w-4 md:w-5 cursor-pointer hover:opacity-80 transition-opacity' src={assets.arrow_icon} alt='' />
                        <img className='w-4 md:w-5 cursor-pointer hover:opacity-80 transition-opacity' src={assets.plus_icon} alt='' />
                    </div>
                </div>
                <div className='p-3 md:p-4 bg-[#242424] mx-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-3 md:pl-4'>
                    <h1 className='text-sm md:text-base'>Create your first playlist</h1>
                    <p className='font-light text-xs md:text-sm'>it's easy we will help you</p>
                    <button className='px-3 md:px-4 py-1 md:py-1.5 bg-white text-[13px] md:text-[15px] text-black rounded-full mt-3 md:mt-4 hover:scale-105 transition-transform'>
                        Create Playlist
                    </button>
                </div>
                <div className='p-3 md:p-4 bg-[#242424] mx-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-3 md:pl-4 mt-1'>
                    <h1 className='text-sm md:text-base'>Let's find some podcasts to follow</h1>
                    <p className='font-light text-xs md:text-sm'>we'll keep you update on new episodes</p>
                    <button className='px-3 md:px-4 py-1 md:py-1.5 bg-white text-[13px] md:text-[15px] text-black rounded-full mt-3 md:mt-4 hover:scale-105 transition-transform'>
                        Browse podcasts
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar