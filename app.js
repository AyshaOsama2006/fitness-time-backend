require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nutritionRoutes = require('./routes/nutritionRoutes');
const userRoutes = require('./routes/userRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/nutrition', nutritionRoutes);
app.use('/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})