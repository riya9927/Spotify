import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const SongItem = ({ image, name, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] h-[195px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-full h-[150px] object-cover" src={image} alt="" />
      <p className="font-bold mt-2 text-center">{name}</p>
    </div>
  );
};

export default SongItem;
