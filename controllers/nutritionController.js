const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an AI-powered Sports Nutrition Assistant. Return ONLY valid JSON, no explanations outside JSON.

Rules:
- SMART MEAL PLANNER: return JSON array of 3-5 meals with: mealName, ingredients, calories, protein, carbohydrates, fat, shortPreparation
- PERSONAL CALCULATOR: return JSON object with: dailyCalories, protein, carbohydrates, fat
- Always include "disclaimer" field`;

const getMealPlan = async (req, res) => {
  try {
    const { goal, favorites, dislikes, ingredients } = req.body;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Generate 3-5 meals for:
- Goal: ${goal}
- Favorites: ${favorites || 'none'}
- Avoid: ${dislikes || 'none'}
- Ingredients: ${ingredients || 'none'}
Return ONLY a JSON array.` }
      ],
    });

    const text = response.choices[0].message.content;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);
    res.json(data);
  } catch (error) {
    console.error('Meal Plan Error:', error);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
};

const calculateNutrition = async (req, res) => {
  try {
    const { age, gender, weight, height, activity, goal } = req.body;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Calculate daily nutrition for:
- Age: ${age}, Gender: ${gender}
- Weight: ${weight}kg, Height: ${height}cm
- Activity: ${activity}, Goal: ${goal}
Return ONLY a JSON object with dailyCalories, protein, carbohydrates, fat, disclaimer.` }
      ],
    });

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
    const { description, imageBase64, imageType } = req.body;

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (imageBase64) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:${imageType};base64,${imageBase64}`
            }
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
    res.json(data);
  } catch (error) {
    console.error('Calorie Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze calories' });
  }
};
module.exports = { getMealPlan, calculateNutrition, analyzeCalories };