import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filename: req.file.filename });
});

router.get('/list', (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files.');
    }
    const fileUrls = files.map(file => `/uploads/${file}`);
    res.send(fileUrls);
  });
});

export default router;
