const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 定义 User 模型
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
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
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      name: 'email_unique',
      msg: '邮箱地址已存在'
    },
    validate: {
      isEmail: {
        msg: '请输入有效的邮箱地址'
      },
      notEmpty: {
        msg: '邮箱不能为空'
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: '年龄不能为负数'
      },
      max: {
        args: [150],
        msg: '年龄无效'
      }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  }
}, {
  tableName: 'users', // 指定表名
  timestamps: true,   // 自动添加 createdAt 和 updatedAt
  hooks: {
    beforeCreate: (user) => {
      // 创建用户前的钩子函数
      console.log(`正在创建用户: ${user.name}`);
    },
    afterCreate: (user) => {
      console.log(`用户创建成功: ${user.name}`);
    }
  }
});

// 实例方法
User.prototype.getPublicProfile = function() {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    age: this.age,
    status: this.status,
    createdAt: this.createdAt
  };
};

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

module.exports = User;