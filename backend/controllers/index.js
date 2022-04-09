import express from 'express';
import middlewares from './middlewares.js';
import testControllers from './test.js';
import authControllers from './auth.js';
import studentEntryControllers from './manager/student-entry.js';

const routes = express.Router();

const testRoutes = express.Router();
testRoutes.get('/ping', testControllers.handlePing);

const authRoutes = express.Router();
authRoutes.post('/managerLogin', authControllers.handleManagerLogin);
authRoutes.post('/studentLogin', authControllers.handleStudentLogin);

const managerRoutes = express.Router();
managerRoutes.use(middlewares.ensureManagerLoggedIn);
managerRoutes.post('/getStudentInfo', studentEntryControllers.handleGetStudentInfo);
managerRoutes.post('/addStudentEntry', studentEntryControllers.handleAddStudentEntry);

routes.use('/test', testRoutes);
routes.use('/auth', authRoutes);
routes.use('/manager', managerRoutes);

export default routes;
