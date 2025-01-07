import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        album: '',
        duration: '',
        image: '',
        desc:'',
    });
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                if (!id) {
                    toast.error("Invalid song ID");
                    navigate('/list-song');
                    return;
                }

                const response = await axios.get(`${url}/api/song/${id}`);
                if (response.data && response.data.song) {
                    setFormData(response.data.song);
                } else {
                    toast.error("Song details not found");
                    navigate('/list-song');
                }
            } catch (error) {
                console.error('Error fetching song details:', error);
                toast.error(error.response?.data?.message || "Error occurred while fetching song details");
                navigate('/list-song');
            }
        };

        fetchSongDetails();
    }, [id, navigate]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(`${url}/api/album/list`);
                setAlbums(response.data.albums || []);
            } catch (error) {
                toast.error("Failed to fetch albums");
            }
        };
        fetchAlbums();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/song/edit/${id}`, formData);

            if (response.data.success) {
                toast.success("Song updated successfully");
                navigate('/list-song');
            } else {
                toast.error("Failed to update song");
            }
        } catch (error) {
            console.error('Error updating song:', error);
            toast.error(error.response?.data?.message || "Error occurred while updating song");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Song</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Album</label>
                    <select
                        name="album"
                        value={formData.album}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Album</option>
                        {albums.map((album) => (
                            <option key={album._id} value={album._id}>
                                {album.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter song description"
                    ></textarea>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => navigate('/list-song')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
