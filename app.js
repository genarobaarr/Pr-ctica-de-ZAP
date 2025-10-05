require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet'); //AGREGADO
const db = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet()); //AGREGADO

/*
// Ruta vulnerable a inyección SQL (intencional)
app.get('/users', (req, res) => {
  const name = req.query.name || '';
  const sql = `SELECT id, name, email FROM users WHERE name LIKE '%${name}%'`; // VULNERABLE
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).send('Error DB');
    res.render('users', { rows, q: name });
  });
});
*/

// Ruta segura con consultas parametrizadas
app.get('/users', (req, res) => {
  const name = req.query.name || '';
  const sql = "SELECT id, name, email FROM users WHERE name LIKE ?";
  db.all(sql, [`%${name}%`], (err, rows) => {
    if (err) return res.status(500).send('Error DB');
    res.render('users', { rows, q: name });
  });
});

/*
// XSS reflejado (eco sin escapar)
app.get('/echo', (req, res) => {
  const msg = req.query.msg || '';
  res.send(`<h1>Echo</h1><p>${msg}</p>`); // VULNERABLE
});
*/

// views/echo.ejs (usa <%= msg %>)
app.get('/echo', (req, res) => {
  const msg = req.query.msg || '';
  res.render('echo', { msg });
});

app.get('/', (req, res) => res.render('index'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App en http://localhost:${port}`));