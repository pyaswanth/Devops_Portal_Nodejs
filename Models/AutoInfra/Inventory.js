import mongoose from 'mongoose';

// user model to the database
const inventorySchema = mongoose.Schema({
	friendlyName:{type:String,required:true},
	hostName:{type:String,required:true},
    ipAddress:{type:String,required:true},
    organizationID:{type:String,required:true},
})
const InventoryModel = mongoose.model('INVENTORY',inventorySchema)

export default InventoryModel