import express from 'express'
import { AddInventory,HomeInventory,EditInventory,DeleteInventory } from '../../../Controllers/AutoInfra/Inventory.js'
const router = express.Router();

router.post('/inventory/add',AddInventory)
router.post('/inventory/home',HomeInventory)
router.post('/inventory/edit',EditInventory)
router.post('/inventory/delete',DeleteInventory)


export default router;


