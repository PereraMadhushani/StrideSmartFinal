import express from 'express';
import con from '../Utils/db.js';
const router = express.Router();


export const salaryRouter = (io) => {
// Endpoint to add shoe production data
router.post("/production", (req, res) => {
    const { regNumber, shoe_type, size, unit_price, quantity } = req.body;
    const total_amount = unit_price * quantity;
    con.query(
      "INSERT INTO ShoeProduction (regNumber, shoe_type, size, unit_price, quantity, total_amount) VALUES (?, ?, ?, ?, ?, ?)",
      [regNumber, shoe_type, size, unit_price, quantity, total_amount],
      (err, result) => {
        if (err) throw err;
        res.send({ message: "Production data added successfully", result });
      }
    );
  });
  
  // Endpoint to calculate and get net salary for an employee
  router.get("/salary/:regNumber", (req, res) => {
    const { regNumber } = req.params;
    con.query(
      "SELECT SUM(total_amount) AS net_salary FROM ShoeProduction WHERE regNumber = ?",
      [regNumber],
      (err, result) => {
        if (err) throw err;
        const netSalary = result[0].net_salary || 0;
       con.query(
          "INSERT INTO Salary (regNumber, net_salary) VALUES (?, ?)",
          [regNumber, netSalary],
          (err) => {
            if (err) throw err;
            res.send({ regNumber, net_salary: netSalary });
          }
        );
      }
    );
  });
  return router;
}