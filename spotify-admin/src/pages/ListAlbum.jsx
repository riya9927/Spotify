import React, { useEffect, useState } from 'react';
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/album/list`);
      
      if (response.data && response.data.albums) {
        setData(response.data.albums);
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

  const removeAlbum = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this Album?')) {
        return;
      }

      const response = await axios.post(`${url}/api/album/remove`,{id});
      
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      } else {
        toast.error("Failed to delete song");
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      toast.error(error.response?.data?.message || "Error occurred while deleting song");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading) {
    return <div>Loading albums...</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-xl font-bold mb-4">All Albums List</h1>
      
      <div className="space-y-4">
        <div className='hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 rounded'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>

        {data.length === 0 ? (
          <p>No albums found</p>
        ) : (
          data.map((item, index) => (
            <div 
              key={item._id || index} 
              className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm rounded hover:bg-gray-50'
            >
              <img 
                className='w-12 h-12 object-cover rounded' 
                src={item.image} 
                alt={item.name}
              />
              <p className="font-medium">{item.name}</p>
              <p>{item.desc}</p>
              <input type='color' value={item.bgColour} />
              <button 
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => removeAlbum(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListAlbum
