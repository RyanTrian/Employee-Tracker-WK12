const { getAllEmployee } = require('../src/query')
const { prompt } = require('inquirer');
const menu = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
      "View All Employee",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ]
  }
];

async function promptAddEmployee() {
  const employee = await getAllEmployee()
  employeeChoices = employee.map(employee => {
    return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}
  })
 const answer = await prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee\’s first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee\’s last name?"
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee\’s role?",
      // TODO: replace the array place-holder below with the correct choices
      choices: ['1', '2', '3'],
    },
    {
      type: "list",
      name: "manager_id",
      message: "What is the employee\’s manager?",
      choices: employeeChoices,
    },
  ])
  console.log(answer);
} 

module.exports = {
  menu, promptAddEmployee
};
