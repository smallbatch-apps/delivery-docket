const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
// const expressGraphQL = require('express-graphql');
// const schema = require('./schema/schema');
const cors = require('cors');
const util = require('util');
require('dotenv').config();

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const mongoConnectionString = util.format(
  process.env.MONGO_CONNECTION_STRING,
  process.env.MONGO_DB_USER,
  process.env.MONGO_DB_PASS,
  process.env.MONGO_DB_PATH
);

mongoose.connect(mongoConnectionString, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());
//app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

routes(app);

module.exports = app;