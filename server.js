import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());

import UserModel from './Models/user.js'
import checkUserExists from './Models/checkuserexists.js'


//const mongo_db_url="mongodb+srv://yaswanth:Yaswanth%4001@cluster0.jdcz7eb.mongodb.net/?retryWrites=true&w=majority"

const connectionString = 'mongodb+srv://yaswanth:Yaswanth%4001@cluster0.jdcz7eb.mongodb.net/Devops?retryWrites=true&w=majority';

//connecting mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));


//add new user to the DB
//   const newUser = new UserModel({
//     name: 'yash',
//     access: 'reader',
//     password: 'yash@01'
//   });
  
//   newUser.save()
//     .then((savedUser) => console.log('User saved:', savedUser))
//     .catch((error) => console.error('Error saving user:', error));



app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username,password)
    checkUserExists(username)
    .then((LogedInUser) => {
        if (LogedInUser===null){
          console.log('User does not exist.');
          return res.json({ success: false, message: 'User does not exist.', LogedInUser });
        }
        else if(LogedInUser.password===password){
              return res.json({ success: true, message: 'Login successful', LogedInUser });
            }
        else{
              return res.json({ success: false, message: 'Invalid credentials', LogedInUser });
            }
          
        
      });  
  });




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });