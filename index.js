// Import and require Inquirer, dotenv, and console.table
const { prompt, Separator } = require('inquirer');

const cTable = require('console.table');
require('dotenv').config()
// require modules from other folders
const { menu, promptAddEmployee, promptUpdateRole } = require('./src/prompts');
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
      await addEmployee();
      promptMenu();
      break;
    case "Update Employee Role":
      await updateEmployeeRole();
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
  console.log(`\nAdded ${res.firstName} ${res.lastName} to the database\n`);
  })
}

/* 
Run the prompt for update employee role
UPDATE employee role in employee
*/
async function updateEmployeeRole() {
  const res = await promptUpdateRole();
  db.promise().query(`UPDATE employee 
  SET role_id = ?
  WHERE id = ?`, [res.roleId, res.employeeId],
  (err, result) => {
    if (err) {
      console.log(err);
    };
  });
  console.log("\nUpdate Employee's role\n");
};

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
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝\n`);

// Initiate the Menu Prompt
promptMenu();
