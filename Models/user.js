import mongoose from 'mongoose';

// user model to the database
const userSchema = mongoose.Schema({
	username:{type:String,required:true},
	access:{type:String,required:true},
	password:{type:String,required:true},
})
const UserModel = mongoose.model('USER',userSchema)

export default UserModel