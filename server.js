import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Client } from 'ssh2';
import fs from 'fs';
import axios from 'axios';
import { performance } from 'perf_hooks';
// import localtunnel from 'localtunnel';
const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());

// const sshconn = new Client();



import organizationroute from './Routes/AutoInfra/Organizations/Organizations.js'
import usersroute from'./Routes/Users/Users.js'
import inventoryroute from './Routes/AutoInfra/Inventory/Inventory.js'
import projectroute from './Routes/AutoInfra/Projects/Projects.js'
import { createPort } from './PortCreation.js';
import { request } from 'http';
import { streamLineTask,getCommand } from './extractData.js';

// import { parseTextToJSON } from './extractData.js';
// import jobsroute from './Routes/AutoInfra/NewJob/NewJob.js'

const azureFunctionUrl = "https://slahttprequest.azurewebsites.net/api/HttpTrigger1?code=aSM4UV0Xj2fkGsqvhdblcisahKGrFa0uZUEj8SyVRNv0AzFu-ALeZg=="



//const mongo_db_url="mongodb+srv://yaswanth:Yaswanth%4001@cluster0.jdcz7eb.mongodb.net/?retryWrites=true&w=majority"

const connectionString = 'mongodb+srv://yaswanth:Yaswanth%4001@cluster0.jdcz7eb.mongodb.net/Devops?retryWrites=true&w=majority';

//connecting mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>{let a =""} )
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

  // sshconn.on('ready', () => {
  //   let a=""
  //   // console.log('SSH connection established');
  
  // });
  

  // sshconn.connect({
  //   host: '172.17.36.68',
  //   username: 'devopsadm',
  //   port: 22,
  //   privateKey: fs.readFileSync('devopsadm.pem', { encoding: "utf8" })
  //   // password: 'Cm7D5@vN*Z1eq'
  // });

  
  


  app.use('/api/users',usersroute)
  app.use('/api/dashboard-autoinfra',organizationroute)
  app.use('/api/dashboard-autoinfra',inventoryroute)
  app.use('/api/dashboard-autoinfra',projectroute)
  // app.use('/api/dashboard-autoinfra',jobsroute)
 


// app.post('/api/dashboard-autoinfra/jobs/getdata',async (req, res) => {
//   console.log("-----------------------")
//   const data = req.body;
//   console.log('job',data);
  
//   let responseSent = false;
//   const sendResponse = (output) => {
//     if (!responseSent) {
//       responseSent = true;
//       res.status(200).send(JSON.stringify(output));

//     } 
//   };

//   try {
//     const location = "./../ceopsmgmt/ansible_scripts/ara_status/"

//     console.log(`ansible-playbook -e "sysid=${data.hostname}" ${location}${data.playbook}`)

//     sshconn.exec(`ansible-playbook -e "sysid=${data.hostname}" ${location}${data.playbook}`, (err, stream) => {
//       if (err){throw err;}
//       let output = '';

//       stream.on('close', (code, signal) => {
//         console.log('Stream closed with code ' + code + ' and signal ' + signal);
//         sendResponse(output);
//         return;
//       }).on('data', (data) => {
//         output += data;
//         console.log('Received output from Ansible: ' + data);
//       });
//     });
//   }
//   catch (e) {
//     console.log(e)
//   }
// });

// export const createPort = async (server, port) => {
//   console.log('inside-createPort');
//   let output = '';

//   const location = "./../ceopsmgmt/ansible_scripts/testing/";
//   const playbook = "add-firewall-ports.yml";
//   const command = `ansible-playbook -e "sysid=${server}" -e "port=${port}" ${location}${playbook}`;

//   try {
//     // Wrap the SSH execution in a Promise
//     output = await new Promise((resolve, reject) => {
//       sshconn.exec(command, (err, stream) => {
//         if (err) {
//           reject(err);
//           return;
//         }

//         let output = '';

//         stream.on('close', (code, signal) => {
//           console.log('Stream closed with code ' + code + ' and signal ' + signal);
//           resolve(output); // Resolve the Promise with the collected output
//         }).on('data', (data) => {
//           output += data;
//           console.log('Received output from Ansible: ' + data);
//         });
//       });
//     });
//   } catch (e) {
//     console.log(e);
//   }

//   return output;
// }



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

app.post ('/api/teamsMessage',async(req,res)=>{

  const now = new Date();
    

    console.log("----------------------------------")
    console.log("Problem Triggered through Teams")
    console.log("----------------------------------")

  try{
    // Start the timer
    const startTime = performance.now();
    

    const requestData = req.body;

    const input_sentence = {

      email_text: requestData.body,

    };


    const apiUrl = "https://db01-34-70-12-44.ngrok.io/extract_info"

    const response = await axios.post(apiUrl, input_sentence);

    console.log('API Response:', response.data); // Add this line to inspect the response

    const { server_names: serverNames, problem, ports } = response.data;

    const dataarray = [problem[0],serverNames[0],ports[0]]

    console.log()

    console.log('Problem:', problem);
    console.log('Server Name:', serverNames);
    console.log('Port:',ports)

    let result =""
    if(streamLineTask(dataarray)){
      console.log("------------------------")
      console.log("Requested for approval")
      console.log("------------------------")
      result = await getApproval(requestData.body)
    }
    else{
      result = "Approve"
    }

    let output = ""

    if(result==="Approve"){
       let command = await getCommand(dataarray)
       output= await createPort(command)  
       console.log("----------------------------------")
        console.log("Task has been completed by Ansible!!!")
        console.log("----------------------------------")
    }
    else{
      output = "Your Request has been Rejected."
        console.log("--------------------------")
        console.log("Request has been Rejected")
        console.log("--------------------------")
    }
    // console.log("output---->",output)


    const endTime = performance.now();

    // Calculate the time taken in milliseconds
    const timeTakenInMilliseconds = endTime - startTime;

    // Convert milliseconds to minutes and seconds
      const timeTakenInMinutes = Math.floor(timeTakenInMilliseconds / 60000);
      const remainingMilliseconds = timeTakenInMilliseconds % 60000;
      const timeTakenInSeconds = remainingMilliseconds / 1000;

      const roundedSeconds = timeTakenInSeconds.toFixed(4);

      // Output the time taken in minutes and seconds
      console.log(`Time taken: ${timeTakenInMinutes} minutes and ${roundedSeconds} seconds.`);

      const performedTime = `Time taken to complete the task: ${timeTakenInMinutes} minutes and ${roundedSeconds} seconds.`


    const data = {
      // "subject": requestData.subject,
      "body": response.data,
      // "result":output,
      "status": result,
      "output": output,
      "name": response.data.problem[0],
      "performedTime":performedTime,
    }

    // console.log(data)
    res.status(200).json(data);		



}catch (error) {
  console.error('Error handling POST request:', error);
  res.status(500).json({ error: 'Internal server error' });
}
  
})



app.post('/api/email', async(req, res) => {
  const now = new Date();
    // Get current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Get current timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log("----------------------------------")
    console.log("Problem Triggered through Mail")
    console.log("----------------------------------")

  try {

    // Start the timer
    const startTime = performance.now();

    // const startTime= now.toLocaleTimeString();
    // const startDate = now.toLocaleDateString(undefined, options);
    // const startTimeInfo = `${startTime} - ${startDate} - ${timeZone}`;
    
    const requestData = req.body;

    const input_sentence = {

      email_text: requestData.body,

    };


    const apiUrl = "https://db01-34-70-12-44.ngrok.io/extract_info"

    const response = await axios.post(apiUrl, input_sentence);

    console.log('API Response:', response.data); // Add this line to inspect the response

    const { server_names: serverNames, problem, ports } = response.data;

    const dataarray = [problem[0],serverNames[0],ports[0]]


    // console.log(dataarray)

    // console.log('Problem:', response.data[0]);
    // console.log('Server Name:', response.data[1]);
    // console.log('Port:',response.data[2])

    let result=""
    if(await streamLineTask(dataarray)){
      console.log("------------------------")
      console.log("Requested for approval")
      console.log("------------------------")
      result = await getApproval(requestData.body)
    }
    else{
      result = "Approve"
    }

    let output = ""

    if(result==="Approve"){
       let command = await getCommand(dataarray)
       output= await createPort(command)  
       console.log("----------------------------------")
        console.log("Task has been completed by Ansible!!!")
        console.log("----------------------------------")
    }
    else{
      output = "Your Request has been Rejected."
        console.log("--------------------------")
        console.log("Request has been Rejected")
        console.log("--------------------------")
    }

    // const endTime= now.toLocaleTimeString();
    // const endDate = now.toLocaleDateString(undefined, options);
    // const endTimeInfo = `${endTime} - ${endDate} - ${timeZone}`;

    const endTime = performance.now();

    // Calculate the time taken in milliseconds
    const timeTakenInMilliseconds = endTime - startTime;

    // Convert milliseconds to minutes and seconds
      const timeTakenInMinutes = Math.floor(timeTakenInMilliseconds / 60000);
      const remainingMilliseconds = timeTakenInMilliseconds % 60000;
      const timeTakenInSeconds = remainingMilliseconds / 1000;

      const roundedSeconds = timeTakenInSeconds.toFixed(4);

      // Output the time taken in minutes and seconds
      console.log(`Time taken: ${timeTakenInMinutes} minutes and ${roundedSeconds} seconds.`);

      const performedTime = `Time taken to complete the task: ${timeTakenInMinutes} minutes and ${roundedSeconds} seconds.`

    
    // const data = {
    //   "subject": requestData.subject,
    //   "body": response.data,
    //   "result":output,
    //   "startTime":startTimeInfo,
    //   "endTime":endTimeInfo
    // }

    const data = {
      "subject": requestData.subject,
      "body": response.data,
      // "startTime":startTimeInfo,
      // "endTime":endTimeInfo,
      "status": result,
      "output": output,
      "performedTime":performedTime,
    }

    // console.log(data)
    res.status(200).json(data);		
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







  
 


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // const tunnel = await localtunnel({ port: 8000 });
    // console.log('Tunnel URL:', tunnel.url);
    // tunnel.on('close', () => {
    //   console.log('Tunnel has been closed');
    // });

  });

