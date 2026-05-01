const EventEmitter = require('events');

let eventEmitter;

const initializeEventEmitter = () => {
  eventEmitter = new EventEmitter();

  // Load listeners dynamically
  const { generateCertificateForUser } = require('../utils/pdfGenerator');
  
  eventEmitter.on('CourseCompleted', async (data) => {
    console.log('Course completed event received:', data);
    try {
      await generateCertificateForUser(data.studentId, data.courseId);
    } catch (err) {
      console.error('Error generating certificate:', err);
    }
  });

  console.log('EventEmitter initialized');
};

const getEventEmitter = () => {
  if (!eventEmitter) {
    console.warn('EventEmitter not initialized yet');
  }
  return eventEmitter;
};

module.exports = { initializeEventEmitter, getEventEmitter };
