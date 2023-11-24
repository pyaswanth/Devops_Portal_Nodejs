import axios from 'axios';

let job_id = "";

const runProcessAndFetchData = async (jobid) => {
    try {
        const processRunResponse = await axios.post(
            `https://cloud.robocorp.com/api/v1/workspaces/${jobid}/processes/4ab45364-0dc9-4714-80b5-feb0f1bf6f23/process-runs-integrations?token=8x4rxUMY3pKRPxLmJxLsyEyAoeMuWs2FfBHpzKyHMUKtOz8s4dkdBowWVoPhd0ccgVEiawFhIwFFgjJz7y2JYqWGoTXzoo577eLcfPFOMj7ObqGZ0ooHyhMht`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "RC-WSKEY 8x4rxUMY3pKRPxLmJxLsyEyAoeMuWs2FfBHpzKyHMUKtOz8s4dkdBowWVoPhd0ccgVEiawFhIwFFgjJz7y2JYqWGoTXzoo577eLcfPFOMj7ObqGZ0ooHyhMht"
                },
                data: {
                    "any": "valid json"
                }
            }
        );

        job_id = processRunResponse.data.id;

        const getReplicationData = async (jobid) => {
            try {
                const response = await axios.get(
                    `https://cloud.robocorp.com/api/v1/workspaces/${jobid}/assets/d189e8ff-918b-4ab7-93ad-51bc368473d7`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "RC-WSKEY a5fs11lR3Im5sZ69RYlY320ECWVg5kGulTIsK6hC8l4qFfoeOijFeJkAQjr4VeolrGeMwfLcwt7Kv6kbPCdtTx9dCR61WbD829k2ERBNG0Hd8LPgXIMRxAo6e"
                        }
                    }
                );

                if (response.status === 200) {
                    const url = response.data.payload.url;
                    const urlResponse = await axios.get(url);

                    console.log('-------------------------------');
                    console.log('output sent');
                    console.log('-------------------------------');

                    let url_output = urlResponse.data;
                    return url_output;
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching replication data', error);
            }
        };

        const makeApiRequest = async () => {
            try {
                const response = await axios.get(
                    `https://cloud.robocorp.com/api/v1/workspaces/${jobid}/process-runs/${job_id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "RC-WSKEY 8x4rxUMY3pKRPxLmJxLsyEyAoeMuWs2FfBHpzKyHMUKtOz8s4dkdBowWVoPhd0ccgVEiawFhIwFFgjJz7y2JYqWGoTXzoo577eLcfPFOMj7ObqGZ0ooHyhMht"
                        }
                    }
                );

                if (response.status === 200) {
                    console.log(response.data);

                    if (response.data.state === 'completed') {
                        let fin_out = await getReplicationData(jobid);
                        return fin_out
                        // clearInterval(intervalId);
                    }
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data from API', error);
            }
        };

        // Call the API request function every 'interval' milliseconds until the condition is met
        const interval = 20000 * 5; // 20 seconds in milliseconds
        const intervalId = setInterval(async () => {
            await makeApiRequest();
        }, interval);



    } catch (error) {
        console.error('Error starting process run', error);
    }
};

// const getReplicationData = async (jobid) => {
//     try {
//         const response = await axios.get(
//             `https://cloud.robocorp.com/api/v1/workspaces/${jobid}/assets/d189e8ff-918b-4ab7-93ad-51bc368473d7`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "RC-WSKEY a5fs11lR3Im5sZ69RYlY320ECWVg5kGulTIsK6hC8l4qFfoeOijFeJkAQjr4VeolrGeMwfLcwt7Kv6kbPCdtTx9dCR61WbD829k2ERBNG0Hd8LPgXIMRxAo6e"
//                 }
//             }
//         );

//         if (response.status === 200) {
//             const url = response.data.payload.url;
//             const urlResponse = await axios.get(url);

//             console.log('-------------------------------');
//             console.log('output sent');
//             console.log('-------------------------------');

//             let url_output = urlResponse.data;
//             return url_output;
//         } else {
//             console.error('Unexpected response status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error fetching replication data', error);
//     }
// };

export const getRPA = async (jobid) => {
    const output = await runProcessAndFetchData(jobid);
    return output;
};

export const getSend = async () => {
    console.log("output in getSend");
    return "success";
};

export const getCheck = async (output) => {
    console.log(`${output} output in getcheck`);
    return output;
};
