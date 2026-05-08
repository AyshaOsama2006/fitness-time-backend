const { Booking, Trainer } = require('../models');

exports.createBooking = async (req, res) => {
  try {

    console.log("REQ USER:", req.user);

    const booking = await Booking.create({

      userId: req.user.id,

      trainerId: req.body.trainerId,

      bookingDate: req.body.bookingDate,

      bookingTime: req.body.bookingTime,

      status: req.body.status

    });

    res.status(201).json(booking);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Trainer,
          as: 'trainer'
        }
      ]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: Trainer,
          as: 'trainer'
        }
      ]
    });

    if (!booking) return res.status(404).json({ message: "Not found" });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateBooking = async (req, res) => {
  try {
    await Booking.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteBooking = async (req, res) => {
  try {
    await Booking.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};