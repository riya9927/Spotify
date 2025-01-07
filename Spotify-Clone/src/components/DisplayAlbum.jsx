// import React, { useContext } from 'react'
// import NavBar from './Navbar'
// import { useParams } from 'react-router-dom'
// import { assets } from '../assets/assets';
// import { PlayerContext } from '../context/PlayerContext';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const DisplayAlbum = (album) => {
//     const { id } = useParams();
//     // const [albumData,setAlbumData]=useState("");
//     // const {playWithId,albumsData,songsData}=useContext(PlayerContext);
//     const { playWithId, albumsData, songsData } = useContext(PlayerContext);
//     const [albumSongs, setAlbumSongs] = useState([]);
//     const albumData = albumsData.find(album => album._id === id);

//     // useEffect(()=>{
//     //     albumsData.map((item)=>{
//     //         if(item._id === id){
//     //             setAlbumData(item);
//     //         }
//     //     })
//     // },[])

//     useEffect(() => {
//         if (songsData && id) {
//             const filteredSongs = songsData.filter(song => song.album === id);
//             setAlbumSongs(filteredSongs);
//         }
//     }, [songsData, id]);

//     if (!albumData) return <div>Loading...</div>;

//     return albumData ? (
//         <>
//             <NavBar />
//             <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
//                 <img className='h-[195px] w-[195px] rounded object-cover' src={albumData.image} alt="" />
//                 <div className='flex flex-col'>
//                     <p>Playlist</p>
//                     <h2 className='text-5x1 font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
//                     <p className='mt-1'>
//                         <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
//                         <b>Spotify</b>
//                         • 1,323,154 likes
//                         • <b>50 songs,</b>
//                         about 2 hr 30 min
//                     </p>
//                 </div>
//             </div>
//             <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
//                 <p><b className='mr-4'>#</b>Title</p>
//                 <p>Album</p>
//                 <p className='hidden sm:block'>Date Added</p>
//                 <img className='m-auto w-4' src={assets.clock_icon} alt="" />
//             </div>
//             <hr />
//             {albumSongs.map((item, index) => (
//                 <div onClick={() => playWithId(index)} key={index}
//                     className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
//                     <p className='text-white'>
//                         <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
//                         <img className='inline w-10 mr-5' src={item.image} alt="" />
//                         {item.name}
//                     </p>
//                     <p className='text-[15px]'>{albumData.name}</p>
//                     <p className='text-[15px] hidden sm:block'>5 days ago</p>
//                     <p className='text-[15] text-center'>{item.duration}</p>
//                 </div>
//             ))}
//         </>
//     ) : null
// }

// export default DisplayAlbum
import React, { useContext, useEffect, useState } from 'react';
import NavBar from './Navbar';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
  const [albumSongs, setAlbumSongs] = useState([]);

  useEffect(() => {
    if (songsData && id) {
      const filteredSongs = songsData.filter(
        (song) => song.album?._id === id || song.album === id
      );
      setAlbumSongs(filteredSongs);
    }
  }, [songsData, id]);

  const albumData = albumsData.find((album) => album._id === id);
  if (!albumData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen  text-white">
      <NavBar />
      <div className="mt-10 flex flex-col lg:flex-row items-center gap-8 px-6 lg:px-12">
        <img
          className="w-48 lg:w-64 rounded-lg shadow-md"
          src={albumData.image}
          alt={albumData.name}
        />
        <div className="text-center lg:text-left">
          <h2 className="text-5xl font-bold mb-4">{albumData.name}</h2>
          <p className="text-lg text-gray-400">{albumData.desc}</p>
        </div>
      </div>

      <div className="mt-10 px-6 lg:px-12">
        <h3 className="text-2xl font-bold mb-4">Songs</h3>
        {albumSongs.length === 0 ? (
          <p className="text-gray-400">No songs found in this album.</p>
        ) : (
          <div className="divide-y divide-gray-800">
            {albumSongs.map((song, index) => (
              <div
                key={song._id}
                onClick={() => playWithId(song._id, true)}
                className="grid grid-cols-[1fr_3fr_1fr] items-center gap-4 p-4 hover:bg-[#1db9541a] rounded-lg cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{index + 1}</span>
                  <img
                    className="w-12 h-12 rounded shadow"
                    src={song.image}
                    alt={song.name}
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{song.name}</p>
                  <p className="text-sm text-gray-400">{song.artist || 'Unknown Artist'}</p>
                </div>
                <p className="text-gray-400 text-right">{song.duration}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayAlbum;
