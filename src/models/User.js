import DataTypes  from 'sequelize';
import sequelize  from '../config/database.js';

// 定义 User 模型
const User = sequelize.define('Users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: '姓名不能为空'
      },
      len: {
        args: [2, 50],
        msg: '姓名长度必须在2-50个字符之间'
      }
    }
  },
  user_passwd: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
}, {
  freezeTableName: true,
  timestamps: true,   // 自动添加 createdAt 和 updatedAt
  createAt: 'create_at',
  updateAt: 'update_at',
  // hooks: {
  //   beforeCreate: (user) => {
  //     // 创建用户前的钩子函数
  //     console.log(`正在创建用户: ${user.name}`);
  //   },
  //   afterCreate: (user) => {
  //     console.log(`用户创建成功: ${user.name}`);
  //   }
  // }
});


// 静态方法
User.findByEmail = function(email) {
  return this.findOne({ where: { email } });
};

User.getActiveUsers = function() {
  return this.findAll({ 
    where: { status: 'active' },
    order: [['createdAt', 'DESC']]
  });
};
User.sync({alter:true})
export default  User ;