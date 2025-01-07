import React, { useRef, useEffect, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x) => x._id === albumId)?.bgColour || "#121212" : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(to bottom, ${bgColor}, #121212)`
        : "#121212";
    }
  }, [bgColor, isAlbum]);

  return (
    <div
      ref={displayRef}
      className="w-full lg:w-[75%] lg:ml-0 m-2 px-6 pt-4 rounded-xl bg-[#121212] text-white overflow-auto shadow-md transition-all duration-300"
    >
      {albumsData.length > 0 ?
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={<DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />}
          />
        </Routes>
        : null
      }

    </div>
  );
};

export default Display;
