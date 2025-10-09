import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

// 定义用户相关路由
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
// router.logion('/admin/manage',adminController)

export default router;