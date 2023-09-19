import UserModel from './user.js'

async function checkUserExists(username) {
    try {
      const user = await UserModel.findOne({ username });
      console.log(user)
      if(user != null){
        return user
      }
      else{
        return null
      }
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  }

export default checkUserExists;

