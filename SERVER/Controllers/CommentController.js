import Comment from '../Models/commentModel.js'

 export const addComment = async (req, res) => {
    const newComment = new Comment({
        postId: req.body.postId,
        userId: req.body.userId,
        text: req.body.text,
      });
    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Get comments by postId
  export  const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  };