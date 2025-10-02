const { Sequelize } = require('sequelize');
require('dotenv').config();

// 创建 Sequelize 实例连接 MariaDB
const sequelize = new Sequelize(
  process.env.DB_NAME || 'Posts',      // 数据库名
  process.env.DB_USER || 'root',       // 用户名
  process.env.DB_PASS || 'password',   // 密码
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mariadb', // 或者 'mariadb'
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
      underscored: true, // 使用下划线命名风格（created_at 而不是 createdAt）
    }
  }
);


// 测试连接
// Sequelize.prototype.testConnection = function(){
//     try {
//         await sequelize.authenticate();
//         console.log('✅ MariaDB 连接成功');
//         return 0
//     } catch (error) {
//         console.error('❌ 无法连接到 MariaDB:', error);
//         return 1
//     }
// }
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MariaDB 连接成功');
        return 0
    } catch (error) {
        console.error('❌ 无法连接到 MariaDB:', error);
        return 1
    }
};

module.exports = { sequelize, testConnection };