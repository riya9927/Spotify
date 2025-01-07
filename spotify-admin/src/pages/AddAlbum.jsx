import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColour', colour);
      const response = await axios.post(`${url}/api/album/add`, formData);
      if (response.data.success) {
        toast.success("Album added");
        setName("");
        setDesc("");
        setImage(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto text-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Album</h2>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium">Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-28 h-28 object-cover border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition duration-300"
              alt="Upload"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">Album Name</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-300 transition duration-300"
            placeholder="Enter album name"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="text-sm font-medium text-gray-600">Album Description</label>
          <textarea
            id="desc"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-300 transition duration-300 resize-none"
            placeholder="Enter album description"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="bgColour" className="text-sm font-medium text-gray-600">Background Colour</label>
          <input
            id="bgColour"
            onChange={(e) => setColour(e.target.value)}
            value={colour}
            type="color"
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-300 transition duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium text-base hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
        >
          {loading ? 'Adding...' : 'Add Album'}
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
