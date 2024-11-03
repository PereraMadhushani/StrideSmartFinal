import express from 'express';
import con from '../Utils/db.js';
const router = express.Router();


export const salaryRouter = (io) => {
// Endpoint to add shoe production data
router.post("/production", (req, res) => {
    const { regNumber, shoe_type, size, unit_price, quantity } = req.body;
    console.log("Received production data:", req.body);

    const total_amount = unit_price * quantity;
    console.log("Calculated total_amount:", total_amount);
    const sql = "INSERT INTO shoeproduction (regNumber, shoe_type, size, unit_price, quantity, total_amount) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sql, [regNumber, shoe_type, size, unit_price, quantity, total_amount], (err, result) => {
      if (err) {
        console.error("Error inserting production data:", err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log("Production data added successfully, result:", result);
      res.send({ message: "Production data added successfully", result });
    });
  });
  
  // Endpoint to calculate and get net salary for an employee
  router.get("/salary/:regNumber", (req, res) => {
    console.log("salary calculation function are called")
    const regNumber  = req.params;
    console.log("Calculating salary for regNumber:", regNumber);

    const sql = "SELECT SUM(unit_price * quantity) as total_production FROM shoeproduction WHERE regNumber = ?";
    con.query(sql, [regNumber], (err, result) => {
      if (err) {
        console.error("Error calculating salary:", err.message);
        return res.status(500).json({ error: err.message });
      }

      const totalProduction = result[0]?.total_production || 0;
      console.log("Total production amount:", totalProduction);

      const netSalary = totalProduction ; // Assuming 10% of production total
      console.log("Calculated net salary:", netSalary);

      res.json({ regNumber, netSalary });
    });
  });


//   // Validate Registration Number
// router.get('/employee/validate/:regNumber', (req, res) => {
//   console.log("Validating regNumber:", regNumber);
//   const regNumber = req.params.regNumber;
//   console.log("Validating regNumber:", regNumber);

//   const sql = `SELECT COUNT(*) as count FROM user WHERE regNumber = ? AND EXISTS (SELECT 1 FROM employee WHERE regNumber = ?)`;
//   con.query(sql, [regNumber, regNumber], (err, results) => {
//      if (err) {
//         console.error("Error validating registration number:", err.message);
//         return res.status(500).json({ error: err.message });
//       }
//       const isValid = results[0].count > 0;
//       console.log("Validation result for regNumber:", regNumber, "isValid:", isValid);

//       res.json({ valid: isValid });

//   });
// });


  return router;
}