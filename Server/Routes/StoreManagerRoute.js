import express from 'express';
import con from '../Utils/db.js'; // Ensure this is your correct DB connection
import multer from 'multer';
import path from 'path';

const router = express.Router();


export function newRequestRouter(io) {

 // New API endpoint to retrieve data for store manager dashboard
  router.get('/request', async (req, res) => {
    try {
        con.query('SELECT * FROM request_material', (err, result) => {
            if (err) {
                console.error('Error retrieving requests for dashboard:', err);
                return res.status(500).send({ success: false, error: 'Internal Server Error' });
            }

            res.status(200).json({ success: true, data: result });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed', details: error.message });
    }
});
}

