const { getAllEmployee, getAllRoles } = require('../src/query')
const { prompt } = require('inquirer');
// Menu prompt
const menu =
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
  };
// the function that runs the add employee prompt
async function promptAddEmployee() {
  // make a new array of manager names from manager_id
  const employee = await getAllEmployee()
  employeeChoices = employee.map(e => {
    return { name: e.first_name + ' ' + e.last_name, value: e.id };
  });
  const role = await getAllRoles();
  roleChoices = role.map( r => {
    return { name: r.title, value: r.id };
  });
  // add employee prompt
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
      choices: roleChoices,
    },
    {
      type: "list",
      name: "manager_id",
      message: "What is the employee\’s manager?",
      choices: employeeChoices,
    },
  ])
  
  return answer;
}
// async function that runs the update role option
async function promptUpdateRole() {
  // same block of code copied from promptAddEmployee
  const employee = await getAllEmployee()
  employeeChoices = employee.map(e => {
    return { name: e.first_name + ' ' + e.last_name, value: e.id };
  });
  const role = await getAllRoles();
  roleChoices = role.map( r => {
    return { name: r.title, value: r.id };
  });
  // update employee role prompt
  const answer = prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices,
    }
  ]);

  return answer;
}

module.exports = {
  menu, promptAddEmployee, promptUpdateRole
};
