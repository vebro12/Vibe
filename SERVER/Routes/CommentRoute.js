import  express from "express";
import  { addComment, getComments } from '../Controllers/CommentController.js'

const router = express.Router();

router.post('/', addComment);
router.get('/:postId', getComments);


export default router