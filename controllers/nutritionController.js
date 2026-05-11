
const Groq = require('groq-sdk');
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../models');
const MealPlan = db.MealPlan;
const Meal = db.Meal;
const CalorieAnalysis = db.CalorieAnalysis;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an AI-powered Sports Nutrition Assistant. Return ONLY valid JSON, no explanations outside JSON.

Rules:
- SMART MEAL PLANNER: return JSON array of 3-5 meals with: mealName, ingredients, calories, protein, carbohydrates, fat, shortPreparation
- PERSONAL CALCULATOR: return JSON object with: dailyCalories, protein, carbohydrates, fat
- Always include "disclaimer" field`;

// هاد بيولد خطة وجبات للمستخدم ويحفظها بالداتا بيس
const getMealPlan = async (req, res) => {
  try {
  
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });

    const { goal, favorites, dislikes, ingredients } = req.body;

    // بنبعت طلب للذكاء الاصطناعي عشان يولد الوجبات
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user', content: `Generate 3-5 meals for:
- Goal: ${goal}
- Favorites: ${favorites || 'none'}
- Avoid: ${dislikes || 'none'}
- Ingredients: ${ingredients || 'none'}
Return ONLY a JSON array.`
        }
      ],
    });

    // بننظف الرد من الذكاء الاصطناعي ونحوله لـ JSON
    const text = response.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);


    const mealPlan = await MealPlan.create({
      userId: req.user.id,
      goal,
      favorites,
      dislikes,
      ingredients
    });

    // بنحفظ كل وجبة لحالها بجدول Meal
    for (const meal of data) {
      await Meal.create({
        planId: mealPlan.id,
        name: meal.mealName,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbohydrates,
        fat: meal.fat,
        ingredients: Array.isArray(meal.ingredients)
          ? meal.ingredients.join(', ')
          : meal.ingredients
      });
    }

    // بنرجع النتيجة للفرونت
    res.json(data);
  } catch (error) {
    console.error('Meal Plan Error:', error);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
};

const calculateNutrition = async (req, res) => {
  try {
    // بنتأكد المستخدم مسجل دخول
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });

    const { age, gender, weight, height, activity, goal } = req.body;

    // بنبعت للذكاء الاصطناعي عشان يحسب
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user', content: `Calculate daily nutrition for:
- Age: ${age}, Gender: ${gender}
- Weight: ${weight}kg, Height: ${height}cm
- Activity: ${activity}, Goal: ${goal}
Return ONLY a JSON object with dailyCalories, protein, carbohydrates, fat, disclaimer.`
        }
      ],
    });

    // بننظف الرد ونرجعه للفرونت - هاد ما بنحفظه بالداتا بيس
    const text = response.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);
    res.json(data);
  } catch (error) {
    console.error('Calculate Error:', error);
    res.status(500).json({ error: 'Failed to calculate nutrition' });
  }
};

const analyzeCalories = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ message: 'Unauthorized' });
     const { description, imageBase64, imageType } = req.body;

    const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

    // إذا بعت صورة بنحللها، إذا لا بنحلل الوصف النصي
    if (imageBase64) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:${imageType};base64,${imageBase64}` }
          },
          {
            type: 'text',
            text: `Analyze this meal image${description ? ` and description: ${description}` : ''}.
Return ONLY a JSON object with: detectedFoods, estimatedCalories, protein, carbohydrates, fat, healthTip, disclaimer.`
          }
        ]
      });
    } else {
      messages.push({
        role: 'user',
        content: `Analyze this meal: ${description}.
Return ONLY a JSON object with: detectedFoods, estimatedCalories, protein, carbohydrates, fat, healthTip, disclaimer.`
      });
    }

    const response = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages,
    });

    const text = response.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);

    // بنحفظ نتيجة التحليل بالداتا بيس
    await CalorieAnalysis.create({
      userId: req.user.id,
      description: description || null,
      image: imageBase64 ? 'image_uploaded' : null,
      calories: data.estimatedCalories || null,
      protein: data.protein || null,
      carbs: data.carbohydrates || null,
      fat: data.fat || null
    });

    // بنرجع النتيجة للفرونت
    res.json(data);
  } catch (error) {
    console.error('Calorie Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze calories' });
  }
};

module.exports = { getMealPlan, calculateNutrition, analyzeCalories, authMiddleware };