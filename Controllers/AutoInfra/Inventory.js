import InventoryModel from '../../Models/AutoInfra/Inventory.js'
import CredentialModel from '../../Models/AutoInfra/Credentials.js';

export const AddInventory = async (req,res) => {

	try {
		const data = req.body;
		const inventorydata ={
			friendlyName: data.FriedlyName,
			ipAddress: data.IpAddress,
			hostName: data.HostName,
			organizationID: data.Organization_id
		}
        // console.log(inventorydata)
		const Inventory = await InventoryModel.findOne({ipAddress:data.IpAddress})
		let result = null;
		if(Inventory)
			return res.status(404).json({message:'System already exist'})

		const inventoryData = new InventoryModel(inventorydata)
		const savedInventory = await inventoryData.save();
		// console.log(`Saved inventory with ID: ${savedInventory._id}`)

		const credentialdata = {
			inventoryID: savedInventory._id,
			username: data.Username,
			password: data.Password
		}
		const credentialData = new CredentialModel(credentialdata)
		const savedCredential = await credentialData.save();
		// console.log(`Saved credential with ID: ${savedCredential._id}`)
	
		return res.json({ success: true, message: 'Inventory Created successfully' });	
			
	}
	catch(error)
	{
		console.log(error)
		return res.status(500).json({message:'Something went wrong'})
	}

}


export const HomeInventory = async (req,res) => {

	try {
		const data = req.body;
		const inventorydata ={
			friendlyName: data.FriedlyName,
			ipAddress: data.IpAddress,
			hostName: data.HostName,
			organizationID: data.Organization_id
		}

		const and_conditions = []
		const entries = Object.entries(inventorydata);
		for (const [key, value] of entries) {
			if(value){
				const condition = {};
				condition[key] = {"$regex": value, "$options": "i"}
				and_conditions.push(condition)
			}
			
		}			
	    const Inventory = await InventoryModel.find({"$and": and_conditions})	

		let result = null;
		console.log('Inventory',Inventory)
		if(Inventory)
			return res.json(Inventory);
	
		// return res.json({ success: true, message: 'Inventory Created successfully' });	
			
	}
	catch(error)
	{
		console.log(error)
		return res.status(500).json({message:'Something went wrong'})
	}

}


export const EditInventory = async (req,res) => {

	const data = req.body;
    console.log(data.inventory_id)
    const updatedValues = {
		friendlyName: data.FriedlyName,
		hostName: data.HostName,
		ipAddress:data.IpAddress,
		organizationID:data.Organization_id,
    };
    try {
      const result = await InventoryModel.updateOne(
        { _id:data.inventory_id},
        { $set: updatedValues}
       );
      console.log(`${result.nModified} document(s) updated`);
      return res.json({ success: true, message: 'Inventory Edited successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success:false, message: 'Error while updating data' });
    }
	
}


export const DeleteInventory = async (req,res) => {

	const data = req.body;
    try {
      const result = await InventoryModel.findByIdAndDelete(data.inventory_id);
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