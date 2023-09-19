import mongoose from 'mongoose';

// user model to the database
const credentialSchema = mongoose.Schema({
	inventoryID:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
})
const CredentialModel = mongoose.model('CREDENTIALS',credentialSchema)

export default CredentialModel