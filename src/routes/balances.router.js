const express = require('express');
const {getProfile} = require('../middlewares/getProfile.middleware');
const router = express.Router();

const {depositsMoney} = require('../controllers/balances.controller');

router.post('/deposit/:userId', getProfile, depositsMoney);

module.exports = router;
