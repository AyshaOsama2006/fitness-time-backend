const express = require('express');
const router = express.Router();

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

router.get(
  '/:id',
  authMiddleware,
  bookingController.getBookingById
);

router.put(
  '/:id',
  authMiddleware,
  bookingController.updateBooking
);

router.delete(
  '/:id',
  authMiddleware,
  bookingController.deleteBooking
);

module.exports = router;