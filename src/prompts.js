const { getAllEmployee, getAllRoles, getAllDepartments } = require('../src/query')
const { prompt } = require('inquirer');
// Menu prompt
const menu =
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
      "View All Employee",
      "View All Employee By Manager",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "View the total utilized budget of a department",
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
  employeeChoices.unshift({ name: "None", value: null})
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
  const answer = await prompt([
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

// async fx that runs add role prompt
async function promptAddRole() {
  // make a new array with all the department's name
  const department = await getAllDepartments()
  departmentChoices = department.map(d => {
    return { name: d.name, value: d.id };
  });
  // add role prompt questions array
  const answer = prompt([
    {
      type: "input",
      name: "role",
      message: "What is the name of the role?",
      validate: (ans) => ans ? true : console.log("Please enter a valid answer"),
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role",
    },
    {
      type: "list",
      name: "departmentId",
      message: "What department does the role belong to?",
      choices: departmentChoices,
    }
  ])
  return answer;
}

// Add department prompt question
const promptAddDepartment = {
  type: "input",
  name: "department",
  message: "What is the name of the department?",
  validate: (ans) => ans ? true : console.log("Please enter a valid answer"),
}

/* -------------------------------------------------------------------------- */
/*                                    BONUS                                   */
/* -------------------------------------------------------------------------- */

async function promptEmployeeByManager() {
  const employee = await getAllEmployee()
  employeeChoices = employee.map(e => {
    return { name: e.first_name + ' ' + e.last_name, value: e.id };
  });
  const answer = prompt({
    type: "list",
    name: "managerId",
    message: "Who's the manager?",
    choices: employeeChoices,
  });
  return answer;
}

module.exports = {
  menu, promptAddEmployee, promptUpdateRole, promptAddRole, promptAddDepartment,
  promptEmployeeByManager,
};
