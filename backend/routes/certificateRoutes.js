const express = require('express');
const router = express.Router();
const { getMyCertificates, getCertificateById } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

router.route('/my').get(protect, getMyCertificates);
router.route('/:id').get(protect, getCertificateById);

module.exports = router;
