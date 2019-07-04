const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:firstName', controller.getByFirstName);

module.exports = router;