const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./models/model')

const contractsRouter = require('./routes/contracts.router');
const jobsRouter = require('./routes/jobs.router');
const balancesRouter = require('./routes/balances.router');
const adminRouter = require('./routes/admin.router');

const app = express();
app.use(bodyParser.json());

app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('/contracts', contractsRouter);
app.use('/jobs', jobsRouter);
app.use('/balances', balancesRouter);
app.use('/admin', adminRouter);

module.exports = app;
