import axios from 'axios';


let sensitiveTasks = [
                  "add port", 
                  "remove port", 
                  "package installation", 
                  "package uninstallation",
                  "start service",
                  "stop service",
                  "restart_service",
                  "password change",]
let nonSensitiveTasks = [
                  "disk info",
                  "os version",
                  "allowded ports",
                  "running services", 
                  "user list"]
let allTasks = [...sensitiveTasks,...nonSensitiveTasks]



export const getCommand =(modelOutput)=>{
  const location = "./../ceopsmgmt/ansible_scripts/testing/";
  if(modelOutput[0].toLowerCase().trim()==="add port"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "port=${modelOutput[2]}" ${location}add-firewall-ports.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="os version"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}os-info.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="disk info"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}disk-space.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="allowded ports"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}list-open-ports.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="running services"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}get-running-services.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="user list"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}get-users.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="package installation"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "package_state=present" "package_name=${modelOutput.service}" ${location}manage-package-rhel.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="package uninstallation"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "package_state=absent" "package_name=${modelOutput.service}" ${location}manage-package-rhel.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="start service"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "service_state=present" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="stop service"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "service_state=stopped" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  }
  else if(modelOutput[0].toLowerCase().trim()==="restart_service"){
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "service_state=restarted" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  }
  // else if(modelOutput.problem==="password change"){
  //   return `ansible-playbook -e "sysid=${server}" -e "service_state=restarted" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  // }
  else{
    console.log("command not found")
    console.log("Need to add this problem to the list")
  }
  
}

export const streamLineTask = async(modelOutput) =>{

  if(sensitiveTasks.includes(modelOutput[0].toLowerCase().trim())){
    // const approvalStatus = await getApproval(modelOutput)
    // console.log("send for approval",approvalStatus);
    return true
  }
  else if(nonSensitiveTasks.includes(modelOutput[0].toLowerCase().trim())){

    // const command = getCommand(modelOutput)
    // console.log("proceed with execution")

    return false
  }
  else{
    console.log("new type of request,it need to be handled")
    return false
  }
  
}



// streamLineTask(modelOutput)
