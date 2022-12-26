const express = require('express');
const {getProfile} = require('../middlewares/getProfile.middleware');
const router = express.Router();

const {bestProfession, bestClients} = require('../controllers/admin.controller');

router.get('/best-profession', getProfile, bestProfession);
router.get('/best-clients', getProfile, bestClients);

module.exports = router;
