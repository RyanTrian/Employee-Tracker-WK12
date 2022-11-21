// Import and require Inquirer, mysql2, and console.table
const { prompt, Separator } = require('inquirer');

const cTable = require('console.table');
require('dotenv').config()
// require modules from other folders
const { menu, promptAddEmployee } = require('./src/prompts');
const { getAllEmployee } = require('./src/query');
const db = require("./config/connection")

async function promptMenu() {
  const answer = await prompt(menu);
  switch (answer.menu) {
    case "View All Employee":
      const employees = await getAllEmployee();
      console.table(employees);
      promptMenu();
      break;
    case "Add Employee":
      addEmployee();
      promptMenu();
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      promptMenu();
      break;
    case "View All Roles":
      viewAllRoles();
      promptMenu();
      break;
    case "Add Role":
      addRole();
      promptMenu();
      break;
    case "View All Departments":
      viewAllDepartments();
      promptMenu();
      break;
    case "Add Department":
      addDepartment();
      promptMenu();
      break;

    default:
      process.end();
      break;
  }
};



async function addEmployee() {
  const answer = await prompt(promptAddEmployee);

  const res = await db.promise().query(``)
}

promptMenu();
