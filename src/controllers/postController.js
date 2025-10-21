import { json, JSON } from 'sequelize';
import Post from '../models/Post.js';


//返回给前端的功能
export async function getAllPosts (req, res) {
  try {
    const post =await Post.findAll();
    res.json({
      success: true,
      data: post,
      message: 'Posts retrieved successfully'
    });
    console.log(post)
    return post
  } catch (error) {
    console.log(`error from getAllPosts :${error}`)
    res.status(500).json({
      success: false,
      message: 'Error fetching Posts',
      error: error.message
    });
  }
};
//删除文章
export async function deletePost (req, res) {
  try {
    const { id } = req.params;
    await Post.destroy({
      where: {
        id: id
      }
    });
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.log(`error from deletePost :${error}`)
    res.status(500).json({
      success: false,
      message: 'Error deleting Post',
      error: error.message
    });
  }
};
//获取文章数量
export async function getPostsCounts (req, res) {
  try {
    const count = await Post.count();
    res.json({
      success: true,
      data: count,
      message: 'Posts count retrieved successfully'
    });
  } catch (error) {
    console.log(`error from getPostsCounts :${error}`)
    res.status(500).json({
      success: false,
      message: 'Error fetching Posts count',
      error: error.message
    });
  }
};



// async function createPost (req, res) {
// };
function printObject(obj, prefix = "") {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      // 如果值是对象，递归遍历
      if (typeof value === "object" && value !== null) {
        printObject(value, currentKey);
      } else {
        console.log(`键：${currentKey}，值：${value}`);
      }
    }
  }
}
// getAllPosts()
// const posts=getAllPosts()
// posts.then((res)=>{
//   printObject(res)
// }).catch((error)=>{
//   console.log(`posts errors:${error}`)
// })

//获取posts文章数据，并处理为json数据格式，返回给前端