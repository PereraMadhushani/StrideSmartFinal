import express from 'express';
import con from '../Utils/db.js'; // Ensure this is your correct DB connection
import multer from 'multer';
import path from 'path';

const router = express.Router();

//const path = require('path');

// Configure Multer to store images in the 'Images' directory
const storage = multer.diskStorage({
  destination: './Public/Images',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


export const employeeRouter = (io) => {

  // API endpoint to get employee data
  router.get('/employees', (req, res) => {
  const sql = 'SELECT e_id, regNumber, name, email, address, contact_number, image FROM employee';
  con.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);  // Send the fetched data as JSON
      }
  });
});

 //API endpoint to get employee data
 router.get('/getEmployee/:id', (req, res) => {
  const id = req.params.id;
  con.query('SELECT e_id, regNumber, name, email, address, contact_number, image FROM employee WHERE e_id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ Status: false, Error: err });
    } else if (result.length === 0) {
      res.status(404).json({ Status: false, Message: 'Employee not found' });
    } else {
      res.json(result[0]);
    }
  });
});

router.put('/updateEmployee/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const {  name, address, contact_number, email } = req.body;
  const image = req.file ? req.file.filename : null;

 // Update query to include image if it's present
 const query = image
 ? 'UPDATE employee SET name = ?, address = ?, contact_number = ?, email = ?, image = ? WHERE e_id = ?'
 : 'UPDATE employee SET name = ?, address = ?, contact_number = ?, email = ? WHERE e_id = ?';

const params = image
 ? [name, address, contact_number, email, image, id]
 : [name, address, contact_number, email, id];

con.query(query, params, (err, result) => {
 if (err) {
   res.json({ Status: false, Error: err });
  } else if (result.affectedRows === 0) {
    res.status(404).json({ Status: false, Message: 'Employee not found' });
 } else {
   res.json({ Status: true, Message: 'Employee updated successfully' });
 }
});
});

  router.delete('/delete_employee/:e_id', (req, res) => {
    const employeeId = req.params.e_id;
    console.log(`Deleting employee with ID: ${employeeId}`); // Log the employee ID received
    
    const deleteQuery = `DELETE FROM employee WHERE e_id = ?`;
    
    con.query(deleteQuery, [employeeId], (err, result) => {
      if (err) {
        return res.status(500).json({ Error: 'Error deleting employee' });
      }
      res.json({ Status: 'Employee deleted successfully' });
    });
});

  // // Validate Registration Number
  // router.get('/validate/:regNumber', (req, res) => {
  //   const regNumber = req.params.regNumber;
  //   const sql = `SELECT COUNT(*) as count FROM user WHERE regNumber = ? AND EXISTS (SELECT 1 FROM employee WHERE regNumber = ?)`;
  //   con.query(sql, [regNumber, regNumber], (err, results) => {
  //     if (err) return res.status(500).json({ error: err.message });
  //     res.json({ valid: results[0].count > 0 });
  //   });
  // });
  


  // In your employeeRoute.js or similar
// router.put('/update_employee/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, image, address, contact_number, email } = req.body;

//   const query = `UPDATE employee
//                 SET name = ?, image = ?, address = ?, contact_number = ?, email = ?
//                 WHERE id = ?`;

//   const values =[
//     req.body.name,
//     req.body.image,
//     req.body.address,
//     req.body.contact_number,
//     req.body.email,
//   ]

//   con.query(query,[...values,id], (err, result) => {
//     if (err) {
//       if(err) return res.json({Status: false, Error: "Query Error"+ err})
//         return res.json({Status: true, Result: result})
//     }
//     res.send({ Status: true, message: 'Employee updated successfully' });
//   });
// });

   // Validate Registration Number
router.get('/validate/:regNumber', (req, res) => {
  console.log("Validating regNumber:", regNumber);
  const regNumber = req.params.regNumber;
  console.log("Validating regNumber:", regNumber);

  const sql = `SELECT COUNT(*) as count FROM user WHERE regNumber = ? AND EXISTS (SELECT 1 FROM employee WHERE regNumber = ?)`;
  con.query(sql, [regNumber, regNumber], (err, results) => {
     if (err) {
        console.error("Error validating registration number:", err.message);
        return res.status(500).json({ error: err.message });
      }
      const isValid = results[0].count > 0;
      console.log("Validation result for regNumber:", regNumber, "isValid:", isValid);

      res.json({ valid: isValid });

  });
});
  
    return router; // Ensure we return the router instance
}

export default router;
