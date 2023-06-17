const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "class",
});
connection.connect((err) => {
  err ? console.log(err.message) : console.log("Database is connect");
});
module.exports = connection;
