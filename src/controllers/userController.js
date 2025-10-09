import User from '../models/User.js'

export async function getAllUsers (req, res) {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
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

export async function createUser(req, res){
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

export async function deleteUser(params) {
  
}
export async function getUserById(params) {
  
}
export async function updateUser(params) {
  
}