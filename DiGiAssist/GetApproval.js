import { ansibleExec } from './ansibleExecution.js';
import axios from 'axios';
const getApproval = async (task) => {
    let approvalStatus = "";
    try {
      const data = {
        taskRequest: task
      };
  
      // console.log(data);
  
      const response = await axios.post(
        "https://prod-24.eastus.logic.azure.com:443/workflows/b32816812d6c46ecbbde3b5e8b53d1df/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bTnGGPVxLgoiiJGbAtK1lKCm2dpRakEfHBfUMChmCvQ",
        data
      );
  
      console.log("comment-response", response.data);
      approvalStatus = response.data.SelectedOption;
    } catch (error) {
      console.error("Error handling POST request:", error);
    }
  
    return approvalStatus;
  }

  export default getApproval;