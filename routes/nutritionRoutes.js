const express = require('express');
const router = express.Router();
const { getMealPlan, calculateNutrition, analyzeCalories } = require('../controllers/nutritionController');

router.post('/meal-plan', getMealPlan);
router.post('/calculate', calculateNutrition);
router.post('/calorie', analyzeCalories);
module.exports = router;