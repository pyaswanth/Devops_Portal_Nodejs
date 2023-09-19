import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    // Other fields...
    projectName:{type:String,required:true},
    playbooks: {
      type: [String], // This field will store an array of strings
      default: [],    // You can provide a default empty array if needed
    },
  });
  
  // Create a model using the schema
  const ProjectModel = mongoose.model('PROJECTS', projectSchema);
  
  export default ProjectModel;