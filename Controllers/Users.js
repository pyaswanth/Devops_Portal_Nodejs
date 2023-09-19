import checkUserExists from '../Models/Users/checkuserexists.js'
import UserModel from '../Models/Users/user.js'

export const CheckLogin = async (req,res) => {

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

}

