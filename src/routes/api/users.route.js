import { Router } from 'express';
import passport from 'passport';
import AuthenticationController from '../../controllers/users';

const router = Router();

router.post(
    '/register',
    AuthenticationController.register
);
router.post(
    '/login',
    AuthenticationController.login
);

router.get(
    '/current',
    passport.authenticate("jwt", { session: false }, null),
    AuthenticationController.getCurrentUser
);

export default router;
