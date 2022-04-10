import express from 'express';
import middlewares from './middlewares.js';
import testControllers from './test.js';
import authControllers from './auth.js';
import studentEntryControllers from './manager/student-entry.js';
import manageMenusControllers from './manager/manage-menus.js';
import manageExtrasControllers from './manager/manage-extras.js';
import manageMealsControllers from './manager/manage-meals.js';

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
managerRoutes.get('/getMessMenus', manageMenusControllers.handleGetMessMenus);
managerRoutes.get('/getMessExtras', manageExtrasControllers.handleGetMessExtras);
managerRoutes.get('/getExtrasRequests', manageExtrasControllers.handleGetExtrasRequests);
managerRoutes.post('/addMenus', manageMenusControllers.handleAddMenus);
managerRoutes.get('/getMessUpcomingMeals', manageMealsControllers.handleGetMessUpcomingMeals);
managerRoutes.post('/addMeals', manageMealsControllers.handleAddMeals);

routes.use('/test', testRoutes);
routes.use('/auth', authRoutes);
routes.use('/manager', managerRoutes);

export default routes;
