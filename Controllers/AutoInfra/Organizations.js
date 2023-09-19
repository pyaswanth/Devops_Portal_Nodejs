import mongoose from 'mongoose'
import OrganizationModel from '../../Models/AutoInfra/Organization.js'
import InventoryModel from '../../Models/AutoInfra/Inventory.js';

export const AddOrganization = async (req,res) => {

	try {
		const data = req.body;
		const Organization = await OrganizationModel.findOne({organization:data.organization})
		let result = null;
		if(Organization)
			return res.status(404).json({message:'Organization already exist'})

		const oranizationData = new OrganizationModel(data)
		await oranizationData.save();
		res.json({ success: true, message: 'Oragnization Created successfully' });		
	}
	catch(error)
	{
		console.log(error)
		res.status(500).json({message:'Something went wrong'})
	}

}


export const EditOrganization = async (req,res) => {

	const data = req.body;
    console.log(data.organization_id)
    const updatedValues = {
      organization: data.organization,
      description: data.description,
    };
    try {
      const result = await OrganizationModel.updateOne(
        { _id: data.organization_id },
        { $set: updatedValues}
       );
      console.log(`${result.nModified} document(s) updated`);
      return res.json({ success: true, message: 'Orgnization Edited successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success:false, message: 'Error while updating data' });
    }
	
}

export const ListOrganizations = async (req,res) => {

	try {
		const allData = await OrganizationModel.find();
		return res.json(allData);
	  } catch (error) {
		console.error('Error retrieving data:', error);
		return res.status(500).json({ message: 'Error retrieving data' });
	  }
	
}

export const DeleteOrganization = async (req,res) => {

	const data = req.body;
    try {
      const result = await OrganizationModel.findByIdAndDelete(data.organization_id);
      if (result) {
        console.log(`Document with ID ${data.organization_id} deleted.`);
        return res.json({ success: true, message: 'Organization Deleted successfully' });
      } else {
        console.log(`Document with ID ${data.organization_id} not found.`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: 'Error while deleting organization' });
    }
	
}

export const GetInventory = async (req,res) => {
  const data = req.body
  try{
    // Use the find method to retrieve inventories with the specified organization ID
    const inventories = await InventoryModel.find(data);
    
    // Do something with the retrieved inventories
    console.log('Inventories:', inventories);
    return res.json(inventories);
  } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: 'Error while fetching inventories' });
    }
}


