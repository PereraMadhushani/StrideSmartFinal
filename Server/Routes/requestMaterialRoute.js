import express from 'express';
import con from '../Utils/db.js'; // Ensure this is your correct DB connection
import multer from 'multer';
import path from 'path';

const router = express.Router();


export function requestMaterialRouter(io) {


// API endpoint to submit a new request
// API endpoint to handle new material requests
router.post('/newRequest', (req, res) => {
  const { date, empId, empName, empAddress, rawMaterial, requiredDate } = req.body;

  const query = `
      INSERT INTO request_material (date, regNumber, name, address, raw_material, required_date)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  con.query(
      query,
      [date, empId, empName, empAddress, rawMaterial, requiredDate],
      (err, results) => {
          if (err) {
              console.error('Error inserting request:', err);
              res.status(500).json({ message: 'Failed to submit request.' });
              return;
          }
          res.status(200).json({ message: 'Request submitted successfully!' });
      }
  );
});

router.get('/history-request-material', async (req, res) => {
  try {
    con.query('SELECT * FROM request_material', (err, result) => {
      if (err) {
          console.error('Error retrieving users:', err);
          return res.status(500).send({ success: false, error: 'Internal Server Error' });
      }

      // Check if result is an array and has users
      if (!Array.isArray(result) || result.length === 0) {
          console.log('No users found:', result);
          return res.status(404).send({ success: false, message: 'No users found.' });
      }

      console.log('Users retrieved:', result);
      res.status(200).json({ success: true, users: result });
  });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database query failed', details: error.message });
  }
});

  return router;
}