import { Router } from 'express';
import passport from 'passport';
import ArticleController from '../../controllers/articles';



const router = Router();
router.get(
    '/',
    ArticleController.getArticles
);


router.get(
    '/:articleSlug',
    ArticleController.getSingleArticle
);



router.put(
    '/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.editArticle
);

router.delete(
    '/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.deleteArticle
);

router.post(
    '/like/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.likeArticle
);

router.post(
    '/unlike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.unlikeArticle
);

router.post(
    '/dislike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.dislikeArticle
);
router.post(
    '/undislike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.undislikeArticle
);

router.post(
    '/comment/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.commentOnArticle
);

router.delete(
    '/comment/:articleSlug/:id',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.deleteComment
);


export default router;
