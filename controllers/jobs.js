const Job = require("../models/job");
const CustomError = require("../errors/CustomError");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(200).json({ length: jobs.length, jobs });
};

const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    res.status(200).json({ job });
  } catch (error) {
    throw new CustomError("Please provide valid job ID", 400);
  }
};

const createJob = async (req, res) => {
  const { company, position, status } = req.body;

  if (!company || !position) {
    throw new CustomError("Please provide company and position", 400);
  }

  const job = await Job.create({
    company,
    position,
    status,
    createdBy: req.user.userId,
  });
  res.status(201).json(job);
};

const updateJob = async (req, res) => {
  if (!req.body.company && !req.body.position)
    throw new CustomError("Please provide company and position", 400);

  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ job });
  } catch (error) {
    throw new CustomError("Something went wrong, please try again", 400);
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!job) throw new CustomError("No job found", 400);

    res.status(200).json({ msg: "deleted", job });
  } catch (error) {
    throw new CustomError("Something went wrong, please try again", 400);
  }
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
