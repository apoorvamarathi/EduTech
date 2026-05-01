const Certificate = require('../models/certificateModel');

const getMyCertificates = async (req, res) => {
  const certificates = await Certificate.find({ student: req.user._id }).populate('course', 'title');
  res.status(200).json(certificates);
};

const getCertificateById = async (req, res) => {
  const certificate = await Certificate.findById(req.params.id).populate('course', 'title').populate('student', 'name email');
  if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
  res.status(200).json(certificate);
};

module.exports = { getMyCertificates, getCertificateById };
