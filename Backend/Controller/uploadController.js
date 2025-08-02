const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const path = require('path');

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: 'image'
        });
        return result;
    } catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
};

exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please upload an image'
            });
        }

        const result = await uploadToCloudinary(req.file.path, 'profile-pictures');
        
        fs.unlinkSync(req.file.path);                    //delete local file

        res.status(200).json({
            status: 'success',
            data: {
                url: result.secure_url,
                public_id: result.public_id
            }
        });
    } catch (error) {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.uploadBookImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please upload at least one image'
            });
        }

        const uploadPromises = req.files.map(file => 
            uploadToCloudinary(file.path, 'book-images')
        );

        const results = await Promise.all(uploadPromises);
        
        req.files.forEach(file => {
            fs.unlinkSync(file.path);
        });

        res.status(200).json({
            status: 'success',
            data: results.map(result => ({
                url: result.secure_url,
                public_id: result.public_id
            }))
        });
    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                if (file.path) {
                    fs.unlinkSync(file.path);
                }
            });
        }
        
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { public_id } = req.params;

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === 'not found') {
            return res.status(404).json({
                status: 'fail',
                message: 'Image not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Image deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}; 