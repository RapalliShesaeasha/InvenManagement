import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

const uploadImage = (req, res) => {
    res.json({ message: 'Image uploaded successfully', file: req.file });
};

export { upload, uploadImage };
