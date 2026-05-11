const express = require('express');
const router = express.Router();
const { getMealPlan, calculateNutrition, analyzeCalories } = require('../controllers/nutritionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/meal-plan', authMiddleware, getMealPlan);
router.post('/calculate', authMiddleware, calculateNutrition);
router.post('/calorie', authMiddleware, analyzeCalories);
module.exports = router;