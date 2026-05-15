const { Booking, Trainer } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      trainerId: req.body.trainerId,
      bookingDate: req.body.bookingDate,
      bookingTime: req.body.bookingTime,
      status: req.body.status || "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Trainer,
          as: "trainer",
          attributes: [
            "id",
            "name",
            "specialization",
            "image",
            "available_day",
            "available_time",
          ],
        },
      ],
    });

    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id, 
      },
      include: [
        {
          model: Trainer,
          as: "trainer",
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!updated[0]) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id, 
      }
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};