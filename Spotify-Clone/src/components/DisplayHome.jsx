import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className="mb-10 px-6 lg:px-12 text-white">
        {/* Featured Charts */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Featured Charts</h1>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </section>

        {/* Today's Biggest Hits */}
        <section>
          <h1 className="text-3xl font-bold mb-6">Today's Biggest Hits</h1>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {songsData.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DisplayHome;
