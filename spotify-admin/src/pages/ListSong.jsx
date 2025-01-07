import React, { useEffect, useState } from 'react';
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ListSong = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data && response.data.songs) {
        setData(response.data.songs);
      } else if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        toast.error("Invalid data format received");
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error("Error occurred while fetching songs");
    } finally {
      setLoading(false);
    }
  };

  const removeSong = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this song?')) {
        return;
      }

      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      } else {
        toast.error("Failed to delete song");
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error(error.response?.data?.message || "Error occurred while deleting song");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) {
    return <div>Loading songs...</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-xl font-bold mb-4">All Songs List</h1>

      <div className="space-y-4">
        <div className='hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 rounded'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>

        {data.map((item, index) => (
  <div
    key={item._id || index}
    className='grid grid-cols-2 sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm rounded hover:bg-gray-50'>
    <img
      className='w-12 h-12 object-cover rounded'
      src={item.image}
      alt={item.name}
    />
    <p className="font-medium">{item.name}</p>
    <p className="text-gray-600 truncate">{item.album?.name || 'N/A'}</p>
    <p>{item.duration}</p>
    <div className="flex gap-2">
      <button
        className="text-blue-500 hover:text-blue-700 font-medium"
        onClick={() => navigate(`/edit/${item._id}`)}
      >
        Edit
      </button>
      <button
        className="text-red-500 hover:text-red-700 cursor-pointer"
        onClick={() => removeSong(item._id)}
      >
        Delete
      </button>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default ListSong;