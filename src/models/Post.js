import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// 定义 Post 模型
const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '文章标题不能为空'
      },
      len: {
        args: [1, 255],
        msg: '标题长度必须在5-255个字符之间'
      }
    }
  },
  tags: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '文章标签不能为空'
      },
      len: {
        args: [1, 10],
        msg: '标签长度必须在1-10个字符之间'
      }
    }
  },
  file_path: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '文章文件路径不能为空'
      },
    }
  }
}, {
  tableName: 'Posts',
  timestamps: true
});
// for (let i = 0; i < 10; i++) {
//  Post.create({
//   title: `测试文章${i}`,
//   tags: `测试${i}`,
//   file_path: `test${i}.txt`
// }) 
// }


Post.sync({alter:true})
export default Post;