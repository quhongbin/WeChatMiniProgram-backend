import _express from 'express';
const {express , json, urlencoded} = _express 
import { join,dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的文件路径（替代 __filename）
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录路径（替代 __dirname）
const __dirname = dirname(__filename);


// 导入中间件
// import { requestLogger } from './middleware/authMiddleware.js';

// 导入路由
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'

const app = _express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(json());
app.use(urlencoded({ extended: true }));
// app.use(join(__dirname, 'public'));
// app.use(requestLogger());

// 数据库连接
// mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// 路由配置
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 处理
app.use('/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});