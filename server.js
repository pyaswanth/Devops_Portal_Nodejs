import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Client } from 'ssh2';
import fs from 'fs';
const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());

const sshconn = new Client();



import organizationroute from './Routes/AutoInfra/Organizations/Organizations.js'
import usersroute from'./Routes/Users/Users.js'
import inventoryroute from './Routes/AutoInfra/Inventory/Inventory.js'
import projectroute from './Routes/AutoInfra/Projects/Projects.js'
// import jobsroute from './Routes/AutoInfra/NewJob/NewJob.js'

//const mongo_db_url="mongodb+srv://yaswanth:Yaswanth%4001@cluster0.jdcz7eb.mongodb.net/?retryWrites=true&w=majority"

const connectionString = 'mongodb+srv://yaswanth:Yaswanth%4001@cluster0.jdcz7eb.mongodb.net/Devops?retryWrites=true&w=majority';

//connecting mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

  sshconn.on('ready', () => {
    console.log('SSH connection established');
  
  });
  

  sshconn.connect({
    host: '172.17.36.68',
    username: 'devopsadm',
    port: 22,
    privateKey: fs.readFileSync('devopsadm.pem', { encoding: "utf8" })
  });


  app.use('/api/users',usersroute)
  app.use('/api/dashboard-autoinfra',organizationroute)
  app.use('/api/dashboard-autoinfra',inventoryroute)
  app.use('/api/dashboard-autoinfra',projectroute)
  // app.use('/api/dashboard-autoinfra',jobsroute)
 
//add new user to the DB
//   const newUser = new UserModel({
//     name: 'yash',
//     access: 'reader',
//     password: 'yash@01'
//   });
  
//   newUser.save()
//     .then((savedUser) => console.log('User saved:', savedUser))
//     .catch((error) => console.error('Error saving user:', error));




// app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
//     console.log(username,password)
//     checkUserExists(username)
//     .then((LogedInUser) => {
//         if (LogedInUser===null){
//           console.log('User does not exist.');
//           return res.json({ success: false, message: 'User does not exist.', LogedInUser });
//         }
//         else if(LogedInUser.password===password){
//               return res.json({ success: true, message: 'Login successful', LogedInUser });
//             }
//         else{
//               return res.json({ success: false, message: 'Invalid credentials', LogedInUser });
//             }
          
        
//       });  
//   });

app.post('/api/dashboard-autoinfra/jobs/getdata',async (req, res) => {
  console.log("-----------------------")
  const data = req.body;
  console.log('job',data);
  
  let responseSent = false;
  const sendResponse = (output) => {
    if (!responseSent) {
      responseSent = true;
      res.status(200).send(JSON.stringify(output));

    } 
  };

  try {
    const location = "./../ceopsmgmt/ansible_scripts/ara_status/"

    console.log(`ansible-playbook -e "sysid=${data.hostname}" ${location}${data.playbook}`)

    sshconn.exec(`ansible-playbook -e "sysid=${data.hostname}" ${location}${data.playbook}`, (err, stream) => {
      if (err){throw err;}
      let output = '';

      stream.on('close', (code, signal) => {
        console.log('Stream closed with code ' + code + ' and signal ' + signal);
        sendResponse(output);
        return;
      }).on('data', (data) => {
        output += data;
        console.log('Received output from Ansible: ' + data);
      });
    });
  }
  catch (e) {
    console.log(e)
  }
});



  
 


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

