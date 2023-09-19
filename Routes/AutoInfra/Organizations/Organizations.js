import express from 'express'
import { AddOrganization,EditOrganization,ListOrganizations,DeleteOrganization,GetInventory } from '../../../Controllers/AutoInfra/Organizations.js'; 
// import auth from '../middleware/auth.js'
const router = express.Router();

// router.post('/adduser',auth,AddUser)
// router.post('/edituser',auth,EditUser)
// router.post('/signin',SignIn)
// router.get('/getuser',auth,GetUser)
// router.delete('/deleteuser/:id',auth,DeleteUser);

router.post('/organizations/add',AddOrganization)
router.post('/organizations/ModalEdit',EditOrganization)
router.post('/organizations/edit',ListOrganizations)
router.post('/organizations/delete',DeleteOrganization)
router.post('/organizations/inventory-data',GetInventory)

 
export default router;

