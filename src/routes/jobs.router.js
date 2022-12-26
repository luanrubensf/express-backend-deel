const express = require('express');
const {getProfile} = require('../middlewares/getProfile.middleware');
const router = express.Router();

const {getUnpaid, payJob} = require('../controllers/jobs.controller');

router.get('/unpaid', getProfile, getUnpaid);
router.post('/:id/pay', getProfile, payJob);

module.exports = router;
