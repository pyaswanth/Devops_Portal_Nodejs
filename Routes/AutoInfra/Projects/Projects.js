import express from 'express'
import { AddProject,GetProjects,GetPlaybooks } from '../../../Controllers/AutoInfra/Projects.js';
// import auth from '../middleware/auth.js'
const router = express.Router();


router.post('/projects/add',AddProject)
router.post('/projects/getprojects',GetProjects)
router.post('/projects/getplaybooks',GetPlaybooks)

 
export default router;