import { ansibleExec } from './ansibleExecution.js';
import { streamLineTask, getCommand } from './extractData.js';
import getApproval from './GetApproval.js';
import { getRPA } from './rpaExecution.js';
import { jobid } from './extractData.js';
import { getCheck } from './rpaExecution.js';
import { getSend } from './rpaExecution.js';

const DiGiAssist = async(req) => {

    try {

        // Start the time
        const startTime = performance.now();


        // const requestData = req.body;

        // const input_sentence = {

        //   email_text: requestData.body,

        // };


        // const apiUrl = "https://db01-34-70-12-44.ngrok.io/extract_info"

        // const response = await axios.post(apiUrl, input_sentence);

        // console.log('API Response:', response.data); // Add this line to inspect the response

        // const { server_names: serverNames, problem, ports } = response.data;

        // const dataarray = [problem[0], serverNames[0], ports[0]]

        // const dataarray = ["users list", "Management-VM", "3394"]

        const dataarray = ["disk info", "Management-VM", "N/A"]


        let result = "";
        let streamLineResult = await streamLineTask(dataarray);

        console.log(streamLineResult)

        if (streamLineResult[2] === "sensitive") {

            console.log("------------------------");
            console.log("Requested for approval");
            console.log("------------------------");
            result = "Approve"
            // result = await getApproval(requestData.body)
            // result = await getApproval(dataarray)

        } else if (streamLineResult[2] === "non sensitive") {
            result = "Approve"
        } else if (streamLineResult[2] === "new task") {
            result = "new task";
            console.log('Its a new task, need to store the data for later purpose.Also need to send reply mail by stating it to the customer')
        }

        let output = ""

        if (result === "Approve") {
            let command;
            if (streamLineResult[1] === "RPA") {
                let job = await jobid(dataarray)
                console.log(job)
                const output1 =  await getRPA(job);
                console.log(output1)
                
                console.log("---before----")
                let rs1=await getCheck(output1)
                console.log(`${rs1} output in digissist`)
                console.log("---after----")
            }
            else if (streamLineResult[1] === "Ansible") {

                command = await getCommand(dataarray);
                console.log(command)
                let output_ans = await ansibleExec(command);
                console.log(`digi output \n ${output_ans}`)
                let a=await getApproval(output_ans)
                console.log(a)

            }
            console.log("----------------------------------");
            console.log(`Task has been completed by ${streamLineResult[1]}!!!`);
            console.log("----------------------------------");
        }
        else if (result === "Reject") {

            output = "Your Request has been Rejected."
            console.log("--------------------------")
            console.log("Request has been Rejected")
            console.log("--------------------------")

        }

        else {
            output = "It's a new task, DigiAssistant need to be trained."
        }


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
            // "body": response.data,
            "status": result,
            "output": output,
            "performedTime": performedTime,
        }

        return data;
    } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export default DiGiAssist;