import mongoose from 'mongoose'
import ProjectModel from '../../Models/AutoInfra/Projects.js'

export const AddProject = async (req,res) => {

	try {
		const data = req.body;
        console.log(data)
		const Project = await ProjectModel.findOne({projectName:data.projectName})
		let result = null;
		if(Project)
			return res.status(404).json({message:'Project already exist'})
        console.log('after projects')
		const projectData = new ProjectModel(data)
		await projectData.save();
		res.json({ success: true, message: 'Project Created successfully' });		
	}
	catch(error)
	{
		console.log(error)
		res.status(500).json({message:'Something went wrong'})
	}

}

export const GetProjects = async (req,res) => {

	try {
		const data = req.body;
        console.log(data)
		const Project = await ProjectModel.find().select('projectName')
		let result = null;
		if(Project){
			console.log(Project);
			return res.json(Project);
		}
		else{
			console.log('Something went wrong')
		}		
	}
	catch(error)
	{
		console.log(error)
		res.status(500).json({message:'Something went wrong'})
	}

}

export const GetPlaybooks = async (req,res) => {

	try {
		const data = req.body;
		console.log(data.selectedProject)
		const Plabooks = await ProjectModel.findById(data.selectedProject).select('playbooks');
		let result = null;
		if(Plabooks){
			console.log(Plabooks);
			return res.json(Plabooks);
		}
		else{
			console.log('Something went wrong')
		}		
	}
	catch(error)
	{
		console.log(error)
		res.status(500).json({message:'Something went wrong'})
	}

}

