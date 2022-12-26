const express = require('express');
const {getProfile} = require('../middlewares/getProfile.middleware');
const router = express.Router();

const { get, list } = require('../controllers/contracts.controller');

router.get('/:id', getProfile, get);
router.get('/', getProfile, list);

module.exports = router;
