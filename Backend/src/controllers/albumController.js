import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc= req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url
        }
        const album = albumModel(albumData);
        await album.save();

        res.json({success: true, message: "Album added"})
        } catch (error) {
            res.status(500).json({ success: false,message: 'Failed to add album', error: error.message });
        }
    }

const listAlbum = async (req, res) => {
        try {
            const allAlbums = await albumModel.find();

            res.status(200).json({success: true, albums:allAlbums });
        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: 'Failed to fetch albums', error: error.message });
        }
    }

const removeAlbum = async (req, res) => {
        try {
            const albumId = req.body.id;

            const deletedAlbum = await albumModel.findByIdAndDelete(albumId);

            if (!deletedAlbum) {
                return res.status(404).json({ message: 'Album not found' });
            }

            await cloudinary.uploader.destroy(deletedAlbum.image);

            res.status(200).json({ message: 'Album removed successfully!', album: deletedAlbum });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to remove album', error: error.message });
        }
    }

export { addAlbum, listAlbum, removeAlbum };
