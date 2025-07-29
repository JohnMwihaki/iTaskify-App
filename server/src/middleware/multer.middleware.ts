import { Request } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'taskify/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'thumb', gravity: 'face' }],
  },
} as any);


export const upload = multer({ storage });
