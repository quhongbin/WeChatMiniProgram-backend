const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 定义用户相关路由
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.logion('/admin/manage',adminController)

module.exports = router;