
import axios from 'axios';
let job_id = ""

 axios.post("https:cloud.robocorp.com/api/v1/workspaces/29f4b8c4-0f50-4bf2-8918-138d66048275/processes/4330d62a-0d6a-40c6-85a1-d58d0efd4c8f/process-runs-integrations?token=2J26rhRntfXrpH3YRdaablxaTV6S2LSiqRJKRba0Tbnlz8S25WHB3y8L2HRri1zWEQzLW43Fb2qTup6u2VwLYpXrff5ovPYtk6QE5WkIIw6RkSc8jnGI7J4uJwFc", {
     "method": "post",
     "headers": {
         "Content-Type": "application/json",
         "Authorization": "RC-WSKEY 2J26rhRntfXrpH3YRdaablxaTV6S2LSiqRJKRba0Tbnlz8S25WHB3y8L2HRri1zWEQzLW43Fb2qTup6u2VwLYpXrff5ovPYtk6QE5WkIIw6RkSc8jnGI7J4uJwFc"
     },
     "body": "{\"any\":\"valid json\"}"
 }).then((response) => {
     console.log('Response:', response.data);
     job_id = response.data.id
 })
     .catch((error) => {
         console.error('Error:', error);
     });

 
let conditionMet = false;

 //Define the API request function
 const makeApiRequest = async () => {
     try {
         const response = await axios.get(`https:cloud.robocorp.com/api/v1/workspaces/29f4b8c4-0f50-4bf2-8918-138d66048275/process-runs/${job_id}`, {
             "method": "get",
             "headers": {
                 "Content-Type": "application/json",
                 "Authorization": "RC-WSKEY 2J26rhRntfXrpH3YRdaablxaTV6S2LSiqRJKRba0Tbnlz8S25WHB3y8L2HRri1zWEQzLW43Fb2qTup6u2VwLYpXrff5ovPYtk6QE5WkIIw6RkSc8jnGI7J4uJwFc"
             }
         });
         console.log(response.data);
          //Check the condition here
         console.log(response.data.state)
         if (response.data.state === 'completed') {
             conditionMet = true;
         }
     } catch (error) {
         console.error('Error fetching data from API', error);
     }
 };

 //Call the API request function every 20 seconds until the condition is met
 const intervalId = setInterval(async () => {
     if (!conditionMet) {
         await makeApiRequest();
     } else {
         await getreplicationdata();
         clearInterval(intervalId);  //Break the loop
     }
 }, 20000 * 5);  //20 seconds in milliseconds

 const getreplicationdata = async() =>{
     axios.get(`https:cloud.robocorp.com/api/v1/workspaces/29f4b8c4-0f50-4bf2-8918-138d66048275/assets/ce053823-64ce-41a0-8328-8e53d81d03da`, {
         "method": "get",
         "headers": {
             "Content-Type": "application/json",
             "Authorization": "RC-WSKEY bedr5EeJvo0pa0hdhF1CSxAQO2is0gLnXHuh1ySqGNnFyGfNaVZEEAmLXVihJ5laU8OmWc5JnaibtVgFMRFD6omB9bnhC9JUMKLHZU5fg4dpbOMCPMb1yEgXs6GIKY1xL"
         }
     }).then((response) => {
         console.log('Response:', response.data);
         const url = response.data.payload.url
         axios.get(url).then(response => {
             console.log(response.data);
           })
           .catch(error => {
             console.error('Error fetching data from the URL', error);
           });
     })
         .catch((error) => {
             console.error('Error:', error);
         });
 }

 //Define the API request function

