import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ image, name, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="group flex flex-col items-center min-w-[180px] h-[240px] p-4 rounded-lg cursor-pointer hover:bg-gray-800 hover:shadow-md transition duration-300"
    >
      <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={image}
          alt={name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <p className="font-bold text-sm mt-3 text-gray-200 group-hover:text-white text-center truncate">{name}</p>
    </div>
  );
};

export default AlbumItem;
