const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./models/model')
const contracts = require('./routes/contracts');
const jobs = require('./routes/jobs');
const balances = require('./routes/balances');
const admin = require('./routes/admin');

app.use(bodyParser.json());

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/contracts', contracts)
app.use('/jobs', jobs)
app.use('/balances', balances)
app.use('/admin', admin)

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

module.exports = app;
