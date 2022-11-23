// Import and require Inquirer, dotenv, and console.table
const { prompt, Separator } = require('inquirer');

const cTable = require('console.table');
require('dotenv').config()
// require modules from other folders
const { menu, promptAddEmployee, promptUpdateRole, promptAddRole, promptAddDepartment,
  promptEmployeeByManager,  } = require('./src/prompts');
const { getAllEmployee, getAllRoles, getAllDepartments,
  getEmployeeByManager, getBudgetByDepartment } = require('./src/query');
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
    case "View All Employee By Manager":
      await employeeByManager();
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
      await addRole();
      promptMenu();
      break;
    case "View All Departments":
      const deparments = await getAllDepartments();
      console.table(deparments);
      promptMenu();
      break;
    case "Add Department":
      await addDepartment();
      promptMenu();
      break;
    case "View the total utilized budget of a department":
      const budget = await getBudgetByDepartment();
      console.table(budget);
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
  await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  (?, ?, ? ,?)`, 
  [res.firstName, res.lastName, res.role, res.manager_id],
  (err, result) => {
    if (err) {
      console.log(err);
    }
  })
  console.log(`\nAdded ${res.firstName} ${res.lastName} to the database\n`);
}

/* 
Run the prompt for update employee role
UPDATE employee role in employee
*/
async function updateEmployeeRole() {
  const res = await promptUpdateRole();
  await db.promise().query(`UPDATE employee 
  SET role_id = ?
  WHERE id = ?`, [res.roleId, res.employeeId],
  (err, result) => {
    if (err) {
      console.log(err);
    };
  });
  console.log("\nUpdate Employee's role\n");
};

/* 
Run the prompt for add role
INSERT INTO role
*/
async function addRole() {
  const res = await promptAddRole();
  await db.promise().query(`INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)`, 
  [res.role, res.salary, res.departmentId],
  (err, result) => {
    if (err) {
      console.log(err);
    };
  });
  console.log(`Added ${res.role} to the database`);
};

/* 
Run the add department prompt
INSERT INTO department
*/
async function addDepartment() {
  const res = await prompt(promptAddDepartment);
  await db.promise().query(`INSERT INTO department (name)
  VALUES (?)`, res.department,
  (err, result) => {
    if (err) {
      console.log(err);
    };
  });
  console.log(`Added ${res.department} to the database`);
}

/* -------------------------------------------------------------------------- */
/*                                    BONUS                                   */
/* -------------------------------------------------------------------------- */

async function employeeByManager() {
  const res = await promptEmployeeByManager();
  const query = await getEmployeeByManager(res.managerId);
  console.table(query);
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
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝\n`);

// Initiate the Menu Prompt
promptMenu();
