import {Router} from 'express';

import articleRoute from './articles.route';
import profileRoute from './profile.route';
import userRoute from './users.route';
import searchRoute from './search.route';
import googleRoute from './google.route';

const routes = Router();

routes.use('/', userRoute);
routes.use('/profiles', profileRoute);
routes.use('/articles', articleRoute);
routes.use('/articles/filter', searchRoute);
routes.use('/google', googleRoute);

export default routes;
