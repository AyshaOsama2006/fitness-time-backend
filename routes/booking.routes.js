const express = require('express');
const router = express.Router();
app.use(express.json());

const bookingController = require('../controllers/booking.controller');

const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/',
  authMiddleware,
  bookingController.createBooking
);

router.get(
  '/',
  authMiddleware,
  bookingController.getAllBookings
);
router.get('/:id', bookingController.getBookingById);

router.put('/:id', bookingController.updateBooking);

router.delete('/:id', bookingController.deleteBooking);

module.exports = router;