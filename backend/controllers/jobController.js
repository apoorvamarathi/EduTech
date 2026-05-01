const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

const createJob = async (req, res) => {
  const { title, description, skillsRequired } = req.body;
  
  if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const job = await Job.create({
    recruiter: req.user._id,
    title,
    description,
    skillsRequired,
  });

  res.status(201).json(job);
};

const getJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'Open' }).populate('recruiter', 'name email');
  res.status(200).json(jobs);
};

const applyToJob = async (req, res) => {
  const { jobId, resumeUrl } = req.body;

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can apply' });
  }

  const applicationExists = await Application.findOne({ job: jobId, student: req.user._id });

  if (applicationExists) {
    return res.status(400).json({ message: 'Already applied' });
  }

  const application = await Application.create({
    job: jobId,
    student: req.user._id,
    resumeUrl,
  });

  res.status(201).json(application);
};

const getApplications = async (req, res) => {
  if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const jobs = await Job.find({ recruiter: req.user._id });
  const jobIds = jobs.map(j => j._id);

  const applications = await Application.find({ job: { $in: jobIds } })
    .populate('student', 'name email')
    .populate('job', 'title');
    
  res.status(200).json(applications);
};

const updateApplicationStatus = async (req, res) => {
  const { status, interviewDate, interviewLink } = req.body;
  const application = await Application.findById(req.params.id).populate('job');

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  // Ensure only the recruiter who posted the job can update it
  if (application.job.recruiter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update this application' });
  }

  application.status = status || application.status;
  if (interviewDate) application.interviewDate = interviewDate;
  if (interviewLink) application.interviewLink = interviewLink;

  await application.save();
  res.status(200).json(application);
};

const getMyApplications = async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const applications = await Application.find({ student: req.user._id })
    .populate({
      path: 'job',
      populate: { path: 'recruiter', select: 'name company' }
    });
    
  res.status(200).json(applications);
};

module.exports = {
  createJob,
  getJobs,
  applyToJob,
  getApplications,
  updateApplicationStatus,
  getMyApplications,
};
