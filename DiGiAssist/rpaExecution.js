
import axios from 'axios';



export const rpaExecution = (jobname) => {
    
    let job_id = ""
    let rpaOutput = ""

    axios.post("https://cloud.robocorp.com/api/v1/workspaces/cca1acb0-1996-429b-9e6c-84a9a728dc4f/processes/4ab45364-0dc9-4714-80b5-feb0f1bf6f23/process-runs-integrations?token=8x4rxUMY3pKRPxLmJxLsyEyAoeMuWs2FfBHpzKyHMUKtOz8s4dkdBowWVoPhd0ccgVEiawFhIwFFgjJz7y2JYqWGoTXzoo577eLcfPFOMj7ObqGZ0ooHyhMht", {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "RC-WSKEY 8x4rxUMY3pKRPxLmJxLsyEyAoeMuWs2FfBHpzKyHMUKtOz8s4dkdBowWVoPhd0ccgVEiawFhIwFFgjJz7y2JYqWGoTXzoo577eLcfPFOMj7ObqGZ0ooHyhMht"
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

    // Define the API request function
    const makeApiRequest = async () => {
        try {
            const response = await axios.get(`https://cloud.robocorp.com/api/v1/workspaces/cca1acb0-1996-429b-9e6c-84a9a728dc4f/process-runs/${job_id}`, {
                "method": "get",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "RC-WSKEY 8x4rxUMY3pKRPxLmJxLsyEyAoeMuWs2FfBHpzKyHMUKtOz8s4dkdBowWVoPhd0ccgVEiawFhIwFFgjJz7y2JYqWGoTXzoo577eLcfPFOMj7ObqGZ0ooHyhMht"
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
            rpaOutput = await getreplicationdata();
            clearInterval(intervalId);  //Break the loop
        }
    }, 20000 * 5);  //20 seconds in milliseconds

    const getreplicationdata = async () => {
        axios.get(`https://cloud.robocorp.com/api/v1/workspaces/cca1acb0-1996-429b-9e6c-84a9a728dc4f/assets/d189e8ff-918b-4ab7-93ad-51bc368473d7`, {
            "method": "get",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "RC-WSKEY a5fs11lR3Im5sZ69RYlY320ECWVg5kGulTIsK6hC8l4qFfoeOijFeJkAQjr4VeolrGeMwfLcwt7Kv6kbPCdtTx9dCR61WbD829k2ERBNG0Hd8LPgXIMRxAo6e"
            }
        }).then((response) => {
            console.log('Response:', response.data);
            const url = response.data.payload.url
            axios.get(url).then(response => {
                console.log(response.data);
                return response.data
            })
                .catch(error => {
                    console.error('Error fetching data from the URL', error);
                });
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return rpaOutput
}

//Define the API request function

