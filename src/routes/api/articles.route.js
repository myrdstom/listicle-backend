import { Router } from 'express';
import passport from 'passport';
import ArticleController from '../../controllers/articles';
import LikesAndDislikesController from '../../controllers/likes&dislikes';
import CommentController from '../../controllers/comments';


const router = Router();
router.get(
    '/',
    ArticleController.getArticles
);
router.get(
    '/:articleSlug',
    ArticleController.getSingleArticle
);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.createArticle
);

router.delete(
    '/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    ArticleController.deleteArticle
);

router.post(
    '/like/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    LikesAndDislikesController.likeArticle
);

router.post(
    '/unlike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    LikesAndDislikesController.unlikeArticle
);

router.post(
    '/dislike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    LikesAndDislikesController.dislikeArticle
);
router.post(
    '/undislike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    LikesAndDislikesController.undislikeArticle
);

router.post(
    '/comment/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    CommentController.commentOnArticle
);

router.post(
    '/comment/:articleSlug/:id',
    passport.authenticate('jwt', { session: false }, null),
    CommentController.deleteComment
);


export default router;
