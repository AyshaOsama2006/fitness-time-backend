const { Trainer } = require('../models');


exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.findAll();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Not found" });
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTrainer = async (req, res) => {
  try {
    await Trainer.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTrainer = async (req, res) => {
  try {
    await Trainer.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};