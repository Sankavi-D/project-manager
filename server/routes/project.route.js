const express = require('express');
const { userRegisterValidation, uploadVideoValidation } = require('../validation/validateFunction');
const { userRegister, createProject, uploadVideoHandler, getProjects, updateProjectTranscript } = require('../controllers/project.controller');
const { checkVideoFile } = require('../middleware/multer');
const router = express.Router();

router.post('/user-register', userRegisterValidation, userRegister);
router.post('/project-name', createProject);
router.get('/:userId', getProjects);
router.post('/upload-video', uploadVideoValidation, checkVideoFile, uploadVideoHandler);
router.put('/edit-transcript/:projectId', updateProjectTranscript);

module.exports = router;