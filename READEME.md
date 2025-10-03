express-project/
├── src/                  # 源代码目录
│   ├── routes/           # 路由文件（定义 API 接口）
│   ├── controllers/      # 控制器（处理业务逻辑）
│   ├── middleware/       # 中间件（如权限校验、日志）
│   ├── models/           # 数据模型（如数据库交互）
│   ├── config/           # 配置文件(如数据库的用户，密码等)
│   ├── public/           # 静态资源（图片、CSS、JS）
│   └── app.js            # 应用入口（配置 Express）
├── .env                  # 环境变量（不提交到 Git）
├── .gitignore            # 忽略 Git 提交的文件（如 node_modules）
├── package.json          # 项目依赖配置
└── README.md             # 项目说明

管理界面使用vue+tailwind
技术栈nodejs+express  du1mam9m

routes/
    |
    |------>userRoutes.js,定义用户(User)路由


controllers/
    |
    |------>userController.js   处理用户相关逻辑
    |------>postController.js   处理文章相关(提取，传输等)逻辑

models/
    |
    |------>Post.js     定义文章的结构
    |------>User.js     定义用户模型的结构

config/
    |
    |------>database.js     连接数据库的参数

public/
    |
    |


# 数据库mariadb设计

## Posts表

| 字段    | 类型          | 是否为空 | 描述         |
| ----- | ----------- | ---- | ---------- |
| id    | int         | 否    | 自增，文章唯一标识符 |
| title | varchar(10) | 否    | 文章标题       |
