import { Client } from 'ssh2';
const sshconn = new Client();

export const ExecJob = async (req, res) => {
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
      const location = "./../ceopsmgmt/ansible_scripts/ara_status"
  
      sshconn.exec(`ansible-playbook -e "${data.hostname}" ${location}${data.playbook}`, (err, stream) => {
        if (err) throw err;
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
  };