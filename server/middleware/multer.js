const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Adding random part to the filename
    cb(null, uniqueSuffix + '-' + file.originalname); // Specify the file name format
  }
});

// Custom file filter for video uploads
const videoFileFilter = (req, file, cb) => {
    const filetypes = /mp4|mov|avi|mkv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only MP4, MOV, AVI, and MKV videos are allowed'), false);
    }
};

// Create multer instance for video upload with custom validation
const uploadVideo = multer({
    storage: storage,
    limits: {
      fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
    },
    fileFilter: (req, file, cb) => {
      videoFileFilter(req, file, cb);
    }
}).single('video');

// Middleware to check if files are present for video upload
const checkVideoFile = (req, res, next) => {
    uploadVideo(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ status_code: 400, message: err.message });
      } else if (err) {
        return res.status(400).json({ status_code: 400, message: err.message });
      }
      next();
    });
};
  
module.exports = { uploadVideo, checkVideoFile };
  