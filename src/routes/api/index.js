import {Router} from 'express';

import articleRoute from './articles.route';
import profileRoute from './profile.route';
import userRoute from './users.route'

const routes = Router();

routes.use('/', userRoute);
routes.use('/profiles', profileRoute);
routes.use('/articles', articleRoute);

export default routes;