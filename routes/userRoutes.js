const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/login', userController.loginUser);

router.post('/', userController.createUser);

router.get('/:id', authMiddleware, userController.getUserById);

router.get('/', authMiddleware, roleMiddleware('admin'), userController.getAllUsers);

router.delete('/:id', authMiddleware, roleMiddleware('admin'), userController.deleteUser);

router.post('/meal-plan', authMiddleware, roleMiddleware('coach', 'admin'),

    (req, res) => {
        res.json({ message: "Meal plan created" });
    }
);

module.exports = router;