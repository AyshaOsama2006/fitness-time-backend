<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nutritionRoutes = require('./routes/nutritionRoutes');
const userRoutes = require('./routes/userRouts');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/nutrition', nutritionRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
=======

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nutritionRoutes = require('./routes/nutritionRoutes');
const userRoutes = require('./routes/userRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const trainerRoutes = require('./routes/trainer.routes');
const bookingRoutes = require('./routes/booking.routes');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/nutrition', nutritionRoutes);
app.use('/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/trainers', trainerRoutes);
app.use('/bookings', bookingRoutes);







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> f5a14c8f73ad69e9ec95c4e90c57716ad933fa27
