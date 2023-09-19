import mongoose from 'mongoose';

// user model to the database
const organizationSchema = mongoose.Schema({
	organization:{type:String,required:true},
	description:{type:String,required:true},
})
const OrganizationModel = mongoose.model('ORGNIZATION',organizationSchema)

export default OrganizationModel