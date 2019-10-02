import passport from 'passport';
import { Router } from 'express';
import ProfileController from '../../controllers/profile';
import router from './articles';

router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    ProfileController.getProfile
);

router.post(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    ProfileController.createProfile
);

export default router;