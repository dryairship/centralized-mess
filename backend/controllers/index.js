import express from 'express';
import testControllers from './test.js';
import authControllers from './auth.js';

const routes = express.Router();

const testRoutes = express.Router();
testRoutes.get('/ping', testControllers.handlePing);

const authRoutes = express.Router();
authRoutes.post('/managerLogin', authControllers.handleManagerLogin);
authRoutes.post('/studentLogin', authControllers.handleStudentLogin);

routes.use('/test', testRoutes);
routes.use('/auth', authRoutes);

export default routes;
