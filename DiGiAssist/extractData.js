import axios from 'axios';

//["task name","technology","task type"]
let allTasks = [
  ["add port", "Ansible", "sensitive"],
  ["remove port", "Ansible", "sensitive"],
  ["package installation", "Ansible", "sensitive"],
  ["package uninstallation", "Ansible", "sensitive"],
  ["start service", "Ansible", "sensitive"],
  ["stop service", "Ansible", "sensitive"],
  ["restart_service", "Ansible", "sensitive"],
  ["password change", "Ansible", "sensitive"],

  ["disk info", "Ansible", "non sensitive"],
  ["os version", "Ansible", "non sensitive"],
  ["allowded ports", "Ansible", "non sensitive"],
  ["running services", "Ansible", "non sensitive"],
  ["users list", "Ansible", "non sensitive"],
  ["ssl certification expiration", "Ansible", "non sensitive"],

  ["replication status", "RPA", "non sensitive"],
]

let urls =
  {"kaartech website":"www.kaartech.com",
   "itop website":"www.support.kaarcloud.com",
}



export const getCommand = (modelOutput) => {
  const location = "./../ceopsmgmt/ansible_scripts/testing/";
  if (modelOutput[0].toLowerCase().trim() === "add port") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "port=${modelOutput[2]}" ${location}add-firewall-ports.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "os version") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}os-info.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "disk info") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}disk-space.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "allowded ports") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}list-open-ports.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "running services") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}get-running-services.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "users list") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" ${location}get-users.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "package installation") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "package_state=present" "package_name=${modelOutput.service}" ${location}manage-package-rhel.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "package uninstallation") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "package_state=absent" "package_name=${modelOutput.service}" ${location}manage-package-rhel.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "start service") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "service_state=present" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "stop service") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "service_state=stopped" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "restart_service") {
    return `ansible-playbook -e "sysid=${modelOutput[1]}" -e "service_state=restarted" "service_name=${modelOutput.service}" ${location}manage-services.yml`
  }
  else if (modelOutput[0].toLowerCase().trim() === "ssl certification expiration") {
    return `ansible-playbook -e "url=${urls[modelOutput[1]]}" ${location}ssl-cert-expiry-check.yml`
  }
  else {
    console.log("command not found")
    console.log("Need to add this problem to the list")
  }

}

export const streamLineTask = async (modelOutput) => {

  let matchingTask = await allTasks.find(task => task[0] === modelOutput[0].toLowerCase().trim())

  if (matchingTask) {
  let [task, technology, type] = matchingTask;
  return matchingTask
  }
  else {
    console.log("new type of request,it need to be handled")
    return ["N/A","N/A","new task"]
  }

}

