const db = require('../config/connection');

// get all employees and LEFT JOIN with role and department
async function getAllEmployee() {
  const res = await db.promise().query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`);
  return res[0];
};

// get all roles and LEFT JOIN with department
async function getAllRoles() {
  const res = await db.promise().query(`SELECT r.id, r.title, d.name AS department, r.salary 
  FROM role r
  LEFT JOIN department d
  ON r.department_id = d.id`);
  return res[0];
};

// get all departments
async function getAllDepartments() {
  const res = await db.promise().query('SELECT * FROM department');
  return res[0];
};

/* -------------------------------------------------------------------------- */
/*                                    BONUS                                   */
/* -------------------------------------------------------------------------- */

async function getEmployeeByManager(id) {
  const res = await db.promise().query(`SELECT e.id, e.first_name, e.last_name FROM employee e WHERE e.manager_id = ?`, [id],
  (err, result) => {
    if (err) {
      console.log(err);
    };
  });
  return res[0];
}

async function getBudgetByDepartment() {
  const res = await db.promise().query(`SELECT d.name AS department, SUM(r.salary) AS budget
  FROM employee e 
  LEFT JOIN role r 
  ON e.role_id = r.id 
  LEFT JOIN department d 
  ON r.department_id = d.id 
  GROUP BY r.department_id `);
  return res[0];
}
module.exports = {getAllEmployee, getAllRoles, getAllDepartments,
  getEmployeeByManager, getBudgetByDepartment};

