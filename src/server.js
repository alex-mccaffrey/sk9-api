const express = require('express');
const knex = require("knex");
const app = require('./app')
//const app = express();

const PORT = process.env.PORT || 8000;

const db = knex({
  client: 'pg',
  //connection: DATABASE_URL,
  connection: "postgresql://alex-mcc@localhost/sk9"
})

app.set('db', db)

// app.get('/api/*', (req, res) => {
//   res.json({ok: true});
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};