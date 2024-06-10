const User = require('../models/user');
const Project = require('../models/project');
const Video = require('../models/video');

const userRegister =  async (req, res) => {
    try {
      console.log("Registration Started");
      const { email } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ status_code: 400, message: 'Email already exists' });
      }
  
      const user = new User({ email });
      await user.save();
  
      res.status(201).json({ status_code: 201, message: 'User-Email registered successfully' , user });
    } catch (error) {
      console.error('Error during registration:', error.message);
      res.status(500).json({ status_code: 500, error: 'Registration failed' });
    }
};

const createProject = async (req, res) => {
    try {
        console.log('Creating project name');
        const { userId, projectName } = req.body;
        const project = new Project({ user: userId, projects: projectName });
        await project.save();
        res.status(201).json({ status_code: 201, message: 'Project name created successfully', project });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ user: userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

const uploadVideoHandler = async (req, res) => {
  try {
    console.log("DB Video storing function initiated");
    const user = req.user;
    const { title } = req.body;
    const video = {
      email: user._id,
      videoName: req.file.filename,
      title: title
    };

    const savedVideo = await Video.create(video);

    console.log("Video saved successfully:", savedVideo);
    res.status(201).json({ status_code: 201, message: 'Video uploaded successfully', uploadedVideo: savedVideo });
  } catch (error) {
    console.log("Error on storing video in the database:", error);
    res.status(500).json({ status_code: 500, message: error.message });
  }
};

const updateProjectTranscript = async (req, res) => {
  const { projectId } = req.params;
  const { transcript } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.transcript = transcript;
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project transcript' });
  }
};

module.exports = {
    userRegister,
    createProject,
    getProjects,
    uploadVideoHandler,
    updateProjectTranscript
};
  
  