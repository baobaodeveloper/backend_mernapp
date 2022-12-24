import express from 'express';
import multer from 'multer';
const router = express.Router();
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updateLike,
  updateMessage,
  updatePost,
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'public/image');
  },
  filename: (req, file, cd) => {
    const ext = file.mimetype.split('/')[1];
    cd(null, `post-${Date.now()}.${ext}`);
  },
});

// const multerFilter = (req, file, cd) => {
//   if (file.mimetype.startsWith('image')) {
//     cd(null, true);
//   } else {
//     cb('Not an image! Please upload only images.', false);
//   }
// };

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

export const uploadPostImage = upload.single('photo');

router.route('/').get(getAllPost);
router.get('/:id', getPostById);
router.route('/').post(verifyToken, uploadPostImage, createPost);
router.route('/like').patch(verifyToken, updateLike);
router.route('/message/:id').patch(verifyToken, updateMessage);
router.route('/:id').patch(verifyToken, uploadPostImage, updatePost);
router.route('/:id').delete(verifyToken, deletePost);

export default router;
