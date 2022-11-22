// Import and require Inquirer, dotenv, and console.table
const { prompt, Separator } = require('inquirer');

const cTable = require('console.table');
require('dotenv').config()
// require modules from other folders
const { menu, promptAddEmployee } = require('./src/prompts');
const { getAllEmployee, getAllRoles, getAllDepartments } = require('./src/query');
const db = require("./config/connection")
// Menu prompt switch case
async function promptMenu() {
  const answer = await prompt(menu);
  switch (answer.menu) {
    case "View All Employee":
      const employees = await getAllEmployee();
      console.table(employees);
      promptMenu();
      break;
    case "Add Employee":
      const answer = await addEmployee();
      promptMenu();
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      promptMenu();
      break;
    case "View All Roles":
      const roles = await getAllRoles();
      console.table(roles);
      promptMenu();
      break;
    case "Add Role":
      addRole();
      promptMenu();
      break;
    case "View All Departments":
      const deparments = await getAllDepartments();
      console.table(deparments);
      promptMenu();
      break;
    case "Add Department":
      addDepartment();
      promptMenu();
      break;

    default:
      process.exit();
  }
};

/* 
Run the prompt for add employee
Then INSERT INTO employee
*/
async function addEmployee() {
  const res = await promptAddEmployee();
  db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  (?, ?, ? ,?)`, 
  [res.firstName, res.lastName, res.role, res.manager_id],
  (err, result) => {
    if (err) {
      console.log(err);
    }
  console.log(`Added ${res.firstName} ${res.lastName} to the database`);
  })
}

// ASCII Text Art
console.log(`
███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗  
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝  
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░  
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░  
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗  
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝  

███╗░░░███╗░█████╗░███╗░░██╗░█████╗░░██████╗░███████╗██████╗░
████╗░████║██╔══██╗████╗░██║██╔══██╗██╔════╝░██╔════╝██╔══██╗
██╔████╔██║███████║██╔██╗██║███████║██║░░██╗░█████╗░░██████╔╝
██║╚██╔╝██║██╔══██║██║╚████║██╔══██║██║░░╚██╗██╔══╝░░██╔══██╗
██║░╚═╝░██║██║░░██║██║░╚███║██║░░██║╚██████╔╝███████╗██║░░██║
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝`);

// Initiate the Menu Prompt
promptMenu();
