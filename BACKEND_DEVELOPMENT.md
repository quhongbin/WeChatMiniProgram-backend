# 智农管理系统 - 后端开发文档

## 项目概述

智农管理系统后端是一个基于 Node.js + Express + TypeScript + MariaDB 构建的 RESTful API 服务，为前端提供数据接口和业务逻辑处理。

### 技术栈版本

- **Node.js**: 18.0+
- **Express**: 5.1.0
- **TypeScript**: 5.9.3
- **MariaDB**: 最新版本
- **Sequelize**: 6.37.7 (ORM)
- **CORS**: 2.8.5 (跨域支持)

## 项目结构

```
backend/
├── src/
│   ├── controllers/         # 控制器层
│   │   ├── userController.js    # 用户相关控制器
│   │   └── postController.js    # 文章相关控制器
│   ├── models/             # 数据模型层
│   │   ├── User.js         # 用户模型
│   │   └── Post.js         # 文章模型
│   ├── routes/             # 路由定义
│   │   ├── userRoutes.js   # 用户路由
│   │   └── postRoutes.js   # 文章路由
│   ├── middleware/         # 中间件
│   │   └── authMiddleware.js # 认证中间件
│   ├── config/            # 配置文件
│   │   └── database.js    # 数据库配置
│   ├── public/            # 静态文件目录
│   └── app.js             # 应用入口文件
├── package.json           # 项目配置和依赖管理
├── tsconfig.json         # TypeScript配置
└── READEME.md            # 项目说明
```

## 开发环境搭建

### 前置要求

- Node.js 18.0 或更高版本
- MariaDB 数据库
- npm 或 yarn 包管理器

### 安装步骤

1. **进入后端目录**
```bash
cd zhinong/backend
```

2. **安装依赖**
```bash
npm install
# 或使用 yarn
yarn install
```

3. **配置数据库**
   - 创建 MariaDB 数据库
   - 配置数据库连接信息
   - 运行数据库迁移（如果需要）

4. **启动开发服务器**
```bash
# 开发模式
node src/app.js

# 或使用 nodemon 自动重启
npm install -g nodemon
nodemon src/app.js
```

5. **验证服务**
访问: http://localhost:3000/api/users

## 核心功能模块

### 1. 用户管理模块

**API 接口**

| 方法 | 路径 | 描述 | 控制器方法 |
|------|------|------|-----------|
| GET | `/api/users` | 获取所有用户 | `getAllUsers` |
| GET | `/api/users/:id` | 获取单个用户 | `getUserById` |
| POST | `/api/users` | 创建新用户 | `createUser` |
| PUT | `/api/users/:id` | 更新用户信息 | `updateUser` |
| DELETE | `/api/users/:id` | 删除用户 | `deleteUser` |

**路由配置** (`src/routes/userRoutes.js`)
```javascript
import { Router } from 'express';
const router = Router();
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';

// 定义用户相关路由
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
```

### 2. 文章管理模块

**API 接口**

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/posts` | 获取所有文章 |
| GET | `/api/posts/:id` | 获取单个文章 |
| POST | `/api/posts` | 创建新文章 |
| PUT | `/api/posts/:id` | 更新文章 |
| DELETE | `/api/posts/:id` | 删除文章 |

**路由配置** (`src/routes/postRoutes.js`)
```javascript
import { Router } from 'express';
const router = Router();
import { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost 
} from '../controllers/postController.js';

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
```

## 数据模型

### 用户模型 (User)

**字段定义**
- `id`: 主键，自增整数
- `username`: 用户名，唯一，字符串
- `name`: 姓名，字符串
- `email`: 邮箱，字符串
- `role`: 角色（admin/editor/viewer），字符串
- `status`: 状态（active/inactive），字符串
- `createdAt`: 创建时间，时间戳
- `updatedAt`: 更新时间，时间戳

**Sequelize 模型定义** (`src/models/User.js`)
```javascript
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor', 'viewer'),
    defaultValue: 'viewer'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'users',
  timestamps: true
});

export default User;
```

### 文章模型 (Post)

**字段定义**
- `id`: 主键，自增整数
- `title`: 文章标题，字符串
- `tags`: 标签（逗号分隔），字符串
- `file_path`: 文件路径，字符串
- `status`: 状态，字符串（可选）
- `createdAt`: 创建时间，时间戳
- `updatedAt`: 更新时间，时间戳

## 控制器设计

### 用户控制器示例 (`src/controllers/userController.js`)

```javascript
import User from '../models/User.js';

/**
 * 获取所有用户
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      code: 200,
      message: '获取用户列表成功',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取用户列表失败',
      error: error.message
    });
  }
};

/**
 * 根据ID获取用户
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }
    res.json({
      code: 200,
      message: '获取用户成功',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '获取用户失败',
      error: error.message
    });
  }
};

/**
 * 创建用户
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      code: 201,
      message: '用户创建成功',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: '用户创建失败',
      error: error.message
    });
  }
};

/**
 * 更新用户
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }
    
    await user.update(req.body);
    res.json({
      code: 200,
      message: '用户更新成功',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: '用户更新失败',
      error: error.message
    });
  }
};

/**
 * 删除用户
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在'
      });
    }
    
    await user.destroy();
    res.json({
      code: 200,
      message: '用户删除成功'
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '用户删除失败',
      error: error.message
    });
  }
};
```

## 中间件配置

### CORS 配置 (`src/app.js`)

```javascript
import _cors from 'cors'

/**
 * 跨域配置(开发环境)
 */
const cors = _cors({
  origin: 'http://localhost:5173', // 前端开发服务器地址
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

// 应用中间件
app.use(cors);
```

### 请求日志中间件

```javascript
// src/middleware/requestLogger.js
export const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// 在 app.js 中使用
// app.use(requestLogger);
```

### 错误处理中间件

```javascript
// 统一错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 处理
app.use('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: '路由不存在'
  });
});
```

## 数据库配置

### 数据库连接配置 (`src/config/database.js`)

```javascript
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'zhinong_db',
  username: 'root',
  password: 'password',
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// 测试数据库连接
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error);
    return false;
  }
};

export default sequelize;
```

### 环境变量配置

创建 `.env` 文件：

```env
NODE_ENV=development
DATABASE_URL=mariadb://root:password@localhost:3306/zhinong_db
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

## API 响应格式规范

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    // 具体数据
  }
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "错误描述",
  "error": "详细错误信息（开发环境）"
}
```

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 开发规范

### 1. 代码规范

**文件命名规范**
- 控制器: `camelCaseController.js`
- 模型: `PascalCase.js`
- 路由: `camelCaseRoutes.js`
- 中间件: `camelCaseMiddleware.js`

**函数命名规范**
- 控制器方法: 动词+名词 (`getUsers`, `createUser`)
- 工具函数: 描述性名称

### 2. 错误处理规范

- 所有异步操作使用 try-catch
- 统一的错误响应格式
- 适当的 HTTP 状态码

### 3. 日志规范

- 重要的业务操作记录日志
- 错误信息详细记录
- 开发环境开启详细日志

## 安全考虑

### 1. 输入验证

- 对所有用户输入进行验证
- 使用 Sequelize 的验证功能
- 防止 SQL 注入攻击

### 2. 认证授权

- JWT Token 认证
- 角色权限控制
- 密码加密存储

### 3. 其他安全措施

- CORS 配置
- 请求频率限制
- 敏感信息过滤

## 部署配置

### 生产环境配置

**PM2 配置文件** (`ecosystem.config.js`)

```javascript
module.exports = {
  apps: [{
    name: 'zhinong-backend',
    script: './src/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### 启动命令

```bash
# 开发环境
npm run dev

# 生产环境
npm start

# 使用 PM2
pm2 start ecosystem.config.js
```

## 测试

### 单元测试

```bash
# 安装测试框架
npm install --save-dev jest supertest

# 运行测试
npm test
```

### API 测试

使用 `main.http` 文件进行 API 测试：

```http
### 获取所有用户
GET http://localhost:3000/api/users

### 创建用户
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "username": "testuser",
  "name": "测试用户",
  "email": "test@example.com",
  "role": "viewer"
}
```

## 监控和日志

### 日志管理

- 使用 Winston 或 Morgan 进行日志记录
- 区分不同级别的日志
- 日志文件轮转

### 性能监控

- 监控 API 响应时间
- 数据库查询性能监控
- 内存使用监控

## 常见问题

### 1. 数据库连接失败

**问题**: 无法连接到 MariaDB
**解决**: 
- 检查数据库服务是否启动
- 验证连接配置信息
- 检查防火墙设置

### 2. CORS 错误

**问题**: 前端请求被阻止
**解决**: 
- 检查 CORS 配置
- 验证前端地址是否正确

### 3. 端口被占用

**问题**: 3000 端口已被使用
**解决**: 
```bash
# 查看端口占用
netstat -ano | findstr :3000

# 使用其他端口
PORT=3001 node src/app.js
```

---

*文档最后更新: 2024年*