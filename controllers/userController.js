const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } 
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}


async function getUserById(req, res) {
  try {

    if (req.user.id != req.params.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      activityLevel: req.body.activityLevel,
      fitnessGoal: req.body.fitnessGoal
    });

    const { password, ...userData } = user.toJSON();

    res.status(201).json(userData);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}


async function loginUser(req, res) {
  try {

    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1d' }
    );

    const { password, ...userData } = user.toJSON();

    res.json({ user: userData, token });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}


async function deleteUser(req, res) {
  try {

    if (req.user.id != req.params.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

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