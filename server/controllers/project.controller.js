const User = require('../models/user');

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
        const { email, projectName } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { $push: { projects: projectName } },
            { new: true }
            );
        res.status(201).json({ status_code: 201, message: 'Project name created successfully', projectName });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    userRegister,
    createProject
};
  
  