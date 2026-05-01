const db = require('../models');
const User = db.User;

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function createUser(req, res) {
  try {

    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      activityLevel: req.body.activityLevel,
      fitnessGoal: req.body.fitnessGoal
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function loginUser(req, res) {
  try {

    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function deleteUser(req, res) {
  try {

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.json({ message: 'User deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUser
};