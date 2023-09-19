import express from 'express'
import { CheckLogin } from '../../Controllers/Users.js'
const router = express.Router();

router.post('/login',CheckLogin)

export default router;