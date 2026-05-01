const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const Certificate = require('../models/certificateModel');
const sendEmail = require('./sendEmail');

const generateCertificateForUser = async (studentId, courseId) => {
  const user = await User.findById(studentId);
  const course = await Course.findById(courseId);

  if (!user || !course) return;

  const existingCert = await Certificate.findOne({ student: studentId, course: courseId });
  if (existingCert) return existingCert;

  const certDir = path.join(__dirname, '..', 'public', 'certificates');
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  const filename = `cert_${studentId}_${courseId}.pdf`;
  const filepath = path.join(certDir, filename);

  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4',
  });

  const writeStream = fs.createWriteStream(filepath);
  doc.pipe(writeStream);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f9f9f9');
  doc.fontSize(40).fillColor('#333').text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text('This is to certify that', { align: 'center' });
  doc.moveDown();
  doc.fontSize(30).fillColor('#007bff').text(user.name, { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).fillColor('#333').text('has successfully completed the course', { align: 'center' });
  doc.moveDown();
  doc.fontSize(25).fillColor('#28a745').text(course.title, { align: 'center' });
  
  doc.end();

  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  const pdfUrl = `/public/certificates/${filename}`;

  const certificate = await Certificate.create({
    student: studentId,
    course: courseId,
    pdfUrl,
  });

  await sendEmail({
    email: user.email,
    subject: `Your Certificate for ${course.title}`,
    message: `Congratulations ${user.name}!\n\nYou have completed the course ${course.title}.\nYou can download your certificate here: ${process.env.FRONTEND_URL || 'http://localhost:5000'}${pdfUrl}`
  });

  return certificate;
};

module.exports = { generateCertificateForUser };
