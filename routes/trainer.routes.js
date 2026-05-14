const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainer.controller');
router.post('/', trainerController.createTrainer);

router.get('/', trainerController.getAllTrainers);


router.get('/:id', trainerController.getTrainerById);

router.put('/:id', trainerController.updateTrainer);


router.delete('/:id', trainerController.deleteTrainer);

module.exports = router;