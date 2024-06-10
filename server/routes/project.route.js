const express = require('express');
const { userRegisterValidation } = require('../validation/validateFunction');
const { userRegister, createProject } = require('../controllers/project.controller');
const router = express.Router();

router.post('/user-register', userRegisterValidation, userRegister);
router.post('/project-name', createProject);

module.exports = router;