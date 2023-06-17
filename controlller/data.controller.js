const connection = require("../db.connection");

const getData = async (req, res) => {
  try {
    const id = req.userId;
    console.log("id", id);
    connection.query("SELECT * FROM adddata where id=?", id, (err, results) => {
      if (err) {
        res.status(401).json(err.message);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    res.send(err.message);
  }
};
const addData = async (req, res) => {
  try {
    const id = req.userId;
    console.log("id", id);
    const data = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      id,
    };
    console.log("data", data);
    connection.query("insert into adddata set?", data, (err, results) => {
      if (err) {
        res.status(401).json(err.message);
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = { getData, addData };
