import express from 'express';
import con from '../Utils/db.js';


const router = express.Router();

export const orderRouter = (io) => {

    router.post('/orders', (req, res) => {
        const { regNumber, date, qty, dueDate } = req.body;
      
        const query = `INSERT INTO orders (regNumber, date, qty, dueDate) VALUES (?, ?, ?, ?)`;
        const values = [regNumber, date, qty, dueDate];
      
        con.query(query, values, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to save order' });
          }
          res.status(200).json({ message: 'Order submitted successfully!' });
        });
      });
    }      