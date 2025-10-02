import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

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
        args: [5, 255],
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
        args: [10, 10000],
        msg: '内容长度必须在10-10000个字符之间'
      }
    }
  },
//   authorId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users', // 关联 users 表
//       key: 'id'
//     }
//   },
//   status: {
//     type: DataTypes.ENUM('draft', 'published', 'archived'),
//     defaultValue: 'draft'
//   },
//   publishedAt: {
//     type: DataTypes.DATE,
//     allowNull: true
//   }
}, {
  tableName: 'posts',
  timestamps: true
});


// 定义关联关系
Post.belongsTo(User, { 
  foreignKey: 'authorId', 
  as: 'author',
  onDelete: 'CASCADE' // 用户删除时，其文章也删除
});

User.hasMany(Post, { 
  foreignKey: 'authorId', 
  as: 'posts' 
});

export default Post;