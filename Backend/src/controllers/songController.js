import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';
import albumModel from '../models/albumModel.js';

// const addSong = async (req, res) => {
//     try {
//         const { name, desc, album } = req.body;
//         const audioFile = req.files?.audio?.[0];
//         const imageFile = req.files?.image?.[0];

//         if (!audioFile || !imageFile) {
//             return res.status(400).json({ success: false, message: "Audio and image files are required" });
//         }
//         const foundAlbum = await albumModel.findById(album);
//         if (!foundAlbum) {
//           return res.status(400).json({ success: false, message: "Album not found" });
//         }
    

//         const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

//         const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

//         const albumObj = album !== 'none' ? await albumModel.findOne({ name: album }) : null;
//         const albumId = albumObj ? albumObj._id : null;

//         const songData = {
//             name,
//             desc,
//             album: albumId,
//             image: imageUpload.secure_url,
//             file: audioUpload.secure_url,
//             duration
//         };

//         const song = new songModel(songData);
//         await song.save();

//         res.status(201).json({ success: true, message: "Song added successfully!" });

//     } catch (error) {
//         console.error(error);
//         // Send only one response in case of error
//         if (!res.headersSent) {
//             res.status(500).json({ success: false, message: "An error occurred", error: error.message });
//         }
//     }
// };

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!audioFile || !imageFile) {
            return res.status(400).json({ success: false, message: "Audio and image files are required" });
        }

        // Only check for album if it's provided
        if (album) {
            const foundAlbum = await albumModel.findById(album);
            if (!foundAlbum) {
                return res.status(400).json({ success: false, message: "Album not found" });
            }
        }

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songData = {
            name,
            desc,
            album: album || null, // Use the album ID directly
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        const song = new songModel(songData);
        await song.save();

        res.status(201).json({ success: true, message: "Song added successfully!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "An error occurred", error: error.message });
        }
    }
};

// In songController.js
const listSong = async (req, res) => {
    try {
        const songs = await songModel.find().populate('album', 'name');
        console.log('Songs with populated album:', songs);
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

const removeSong = async (req, res) => {
    try {
        const { id } = req.body;
        const song = await songModel.findByIdAndDelete(id);

        if (!song) {
            return res.status(404).json({ success: false, message: "Song not found" });
        }

        res.status(200).json({ success: true, message: "Song removed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
};

const getSongById = async (req, res) => {
    try {
        const song = await songModel.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }
        res.json({ success: true, song });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, album, duration, image ,desc } = req.body;

        // Find and update the song
        const updatedSong = await songModel.findByIdAndUpdate(
            id,
            { name, album, duration, image, desc  },
            { new: true }
        );

        if (!updatedSong) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        res.status(200).json({ success: true, song: updatedSong });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addSong, listSong, removeSong, getSongById, updateSong };
