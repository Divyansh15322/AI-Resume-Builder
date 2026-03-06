const express = require('express');
const router = express.Router();
const { getResumes, createResume, getResume, updateResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getResumes).post(createResume);
router.route('/:id').get(getResume).put(updateResume).delete(deleteResume);

module.exports = router;
