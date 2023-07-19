const express = require('express');
const router = express.Router();

const Home = require('../controllers/controladorRota');

router.get('/', Home.index);

module.exports = router;
