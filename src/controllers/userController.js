/*
 * @Description: 用户控制器
 * @Function: 从数据库获取可登录用户数据给管理界面
 * @FilePath: src\controllers\userController.js
 */

import User from '../models/User.js'

/**
 * @description: 获取所有用户
 * @return {*}
 */
export async function getAllUsers (req, res) {
  try {
    const users = await User.findAll();
    res.json({
      success: true,
      data: users.map(user => ({
        id: user.user_id,
        username: user.user_name,
        email: user.user_email,
        status: user.user_status,
        role: user.user_role,
        lastLogin: user.last_login
      })),
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

/**
 * @description: 创建用户
 * @return {*}
 */
export async function createUser(req, res){
  try {
    const { name, email, status, role } = req.body;
    
    // 验证必填字段
    if (!name || !email || !status || !role) {
      return res.status(400).json({
        success: false,
        message: '缺少必填字段：姓名、邮箱、状态、角色'
      });
    }
    
    // 设置默认密码为"123456"
    const defaultPassword = '123456';
    
    const user = new User({ 
      user_name: name, 
      user_passwd: defaultPassword,
      user_email: email, 
      user_status: status, 
      user_role: role 
    });
    await user.save();
    
    res.status(201).json({
      success: true,
      data: {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        status: user.user_status,
        role: user.user_role
      },
      message: '用户创建成功，默认密码为：123456'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '创建用户失败',
      error: error.message
    });
  }
};

/**
 * @description: 删除用户
 * @return {*}
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    await user.destroy();
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
}
/**
 * @description: 获取用户ById
 * @return {*}
 */
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      data: user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
}
/**
 * @description: 更新用户的名字,邮箱,年龄
 * @return {*}
 */
export async function updateUser(req, res) {
  try {
    const { id,username, email, role } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    user.user_name = username || user.user_name;
    user.user_email = email || user.user_email;
    user.user_role = role || user.user_role;
    await user.save();
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
}
