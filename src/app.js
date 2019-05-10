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

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());
//app.use('/graphql', expressGraphQL({ schema, graphiql: true }));

routes(app);

module.exports = app;