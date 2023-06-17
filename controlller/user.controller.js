const connection = require("../db.connection");
const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      uid: uuid(),
      email,
      password: hashedPassword,
    };
    const sql = "INSERT INTO user SET ?";
    connection.query(sql, data, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while signing up." });
      } else {
        res.status(200).json({ message: "Signup successful." });
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      email,
      async (err, results) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: "Error retrieving user from database" });
        } else if (!results.length === 0) {
          res.status(401).json({ error: "email is not found" });
        } else {
          const comparePassword = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparePassword) {
            const xyz = jwt.sign(
              { userId: results[0].uid, role: "admin" },
              "ravisahu",
              {
                expiresIn: "1h",
              }
            );
            res.cookie("token", xyz, { httpOnly: true });
            res.status(200).json({ message: "Login successful", xyz });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        }
      }
    );
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { signup, login };
