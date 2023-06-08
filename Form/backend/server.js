const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'form',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the MySQL database');
});

app.post('/api/form', (req, res) => {
  const formData = req.body;

  const sql = 'INSERT INTO forms SET ?';
  db.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).json({ error: 'Error saving form data' });
    } else {
      console.log('Form data saved to the database');
      res.status(200).json({ message: 'Form data saved successfully' });
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
