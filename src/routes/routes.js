const DocketController = require('../controllers/docket');
const LotController = require('../controllers/lot');
const LoginController = require('../controllers/login');
const UserController = require('../controllers/user');
const { checkToken } = require('../../methods');

module.exports = app => {
  app.get('/api/dockets/', checkToken, DocketController.index);
  app.get('/api/dockets/:id', checkToken, DocketController.show);
  app.post('/api/dockets/', checkToken, DocketController.store);
  app.put('/api/dockets/:id', checkToken, DocketController.update);
  app.patch('/api/dockets/:id', checkToken, DocketController.update);

  app.get('/api/dockets/:id/lots', checkToken, LotController.index);
  app.post('/api/dockets/:id/lots', checkToken, LotController.store);

  app.get('/api/users', checkToken, UserController.index);
  app.get('/api/users/:id', checkToken, UserController.show);
  app.patch('/api/users/:id', checkToken, UserController.update);

  // The following routes are not authenticated
  app.post('/api/users', UserController.store);
  app.post('/api/login', LoginController.authenticate);
}