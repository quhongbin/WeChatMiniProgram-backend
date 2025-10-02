import {Post} from '../models/Post';

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.findAll();
    res.json({
      success: true,
      data: post,
      message: 'Posts retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Posts',
      error: error.message
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new Post({ name, email, age });
    await user.save();
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'Post created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};