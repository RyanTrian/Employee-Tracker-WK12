const db = require('../config/connection');

async function getAllEmployee() {
  const res = await db.promise().query(`SELECT * FROM employee`)
  return res[0];
};

module.exports = {getAllEmployee};


