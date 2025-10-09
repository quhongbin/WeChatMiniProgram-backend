import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// 定义 User 模型
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '文章内容不能为空'
      },
      len: {
        args: [1, 10000],
        msg: '内容长度必须在10-10000个字符之间'
      }
    }
  },
}, {
  tableName: 'Posts',
  timestamps: true
});

Post.sync({alter:true})
export default Post;