import { json, JSON } from 'sequelize';
import Post from '../models/Post.js';


//返回给前端的功能
async function getAllPosts (req, res) {
  try {
    const post = Post.findAll();
    // res.json({
    //   success: true,
    //   data: post,
    //   message: 'Posts retrieved successfully'
    // });
    console.log(post)
    return post
  } catch (error) {
    console.log(`error from getAllPosts :${error}`)
    // res.status(500).json({
    //   success: false,
    //   message: 'Error fetching Posts',
    //   error: error.message
    // });
  }
};

async function createPost (req, res) {
  Post.create({title:"测试标题",content:"oiuziocvuoiawejrlnlsmadnfmsandf"})
  Post.create({title:"测试标题1",content:"oioiawuziocvuejrlnlsmadnfmsandf"})
  Post.create({title:"测试标题2",content:"oiuziejrocvuoiawlnlsmadnfmsandf"})
  Post.create({title:"测试标题3",content:"ejoiulnlsmadnziocvuoiawrfmsandf"})
  Post.create({title:"测试标题4",content:"ofmsandfiuziocvuoiawejrlnlsmadn"})
};
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
getAllPosts()
const posts=getAllPosts()
posts.then((res)=>{
  printObject(res)
}).catch((error)=>{
  console.log(`posts errors:${error}`)
})

//获取posts文章数据，并处理为json数据格式，返回给前端