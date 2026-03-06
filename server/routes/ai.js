const express = require('express');
const router = express.Router();
const { analyzeResume, getSuggestion, getAtsScore, improveBullet } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/analyze', analyzeResume);
router.post('/suggest', getSuggestion);
router.post('/ats-score', getAtsScore);
router.post('/improve-bullet', improveBullet);

module.exports = router;
