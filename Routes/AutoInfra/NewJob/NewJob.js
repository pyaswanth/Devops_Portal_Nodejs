import express from 'express'
import { ExecJob } from '../../../Controllers/AutoInfra/NewJob.js';
// import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/jobs/getdata',ExecJob)
 
export default router;