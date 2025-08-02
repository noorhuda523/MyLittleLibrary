const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const uploadController = require('../Controller/uploadController');
const auth = require('../Controller/authController');

router.post('/profile-picture', auth.protect, upload.single('image'), uploadController.uploadProfilePicture);
router.post('/book-images', auth.protect, upload.array('images', 5), uploadController.uploadBookImages);
router.delete('/:public_id', auth.protect, uploadController.deleteImage);

module.exports = router; 