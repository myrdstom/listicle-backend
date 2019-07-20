const express = require('express');
const passport = require('passport');
const Article = require('../../../models/Article');
const Profile = require('../../../models/Profile');
const router = express.Router();
const ValidateArticleInput = require('../../../validation/articles/articles');

//@route    GET api/users/articles
// @desc    View all articles
// @access  Public
router.get('/', (req, res) => {
    const errors = {};
    Article.find()
        .sort({ createdAt: -1 })
        .then(articles => {
            if (articles.length === 0) {
                errors.error = 'This database has no articles';
                return res.status(200).json(errors);
            }
            res.json(articles);
        });
});

/*
@route    GET api/articles/slug
@desc    Get a single article
@access  Public
*/
router.get('/:articleSlug', async (req, res) => {
    const errors = {};
    await Article.findOne({ articleSlug: req.params.articleSlug }).then(
        article => {
            if (!article) {
                errors.error = 'This article does not exist';
                return res.status(404).json(errors);
            }
            res.status(200).json(article);
        }
    );
});

//@route    POST api/users/articles
// @desc    Create article
// @access  Private

router.post(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        const { errors, isValid } = ValidateArticleInput(req.body);
        if (!isValid) {
            res.status(400).json(errors);
        }
        const newArticle = new Article({
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            author: req.user.username,
            user: req.user.id,
        });
        newArticle.save().then(article => res.status(201).json(article));
    }
);

//@route    DELETE api/users/articles/SLUG
// @desc    DELETE article
// @access  Private

router.delete(
    '/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findOne({ articleSlug: req.params.articleSlug })
                .then(article => {
                    if (article.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ error: 'User is not authorized' });
                    }
                    article
                        .remove()
                        .then(() =>
                            res
                                .status(200)
                                .json({ msg: 'Article successfully deleted' })
                        );
                })
                .catch(err =>
                    res.status(404).json({ error: 'article not found' })
                );
        });
    }
);

//@route    POST api/users/articles/like/:slug
// @desc    Like article
// @access  Private

router.post(
    '/like/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findOne({ articleSlug: req.params.articleSlug })
                .then(article => {
                    if (
                        article.likes.filter(
                            like => like.user.toString() === req.user.id
                        ).length > 0
                    ) {
                        return res.status(400).json({
                            error: 'You have already liked this post',
                        });
                    }
                    const removeIndex = article.dislikes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    article.dislikes.splice(removeIndex, 1);
                    article.likes.push({ user: req.user.id });
                    article
                        .save()
                        .then(article => res.status(201).json(article));
                })
                .catch(err =>
                    res.status(404).json({ error: 'article not found' })
                );
        });
    }
);

//@route    POST api/users/articles/dislike/:slug
// @desc    unlike article
// @access  Private

router.post(
    '/unlike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findOne({ articleSlug: req.params.articleSlug })
                .then(article => {
                    if (
                        article.likes.filter(
                            like => like.user.toString() === req.user.id
                        ).length === 0
                    ) {
                        return res.status(400).json({
                            error: 'You have not yet liked this article',
                        });
                    }
                    const removeIndex = article.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    article.likes.splice(removeIndex, 1);
                    article
                        .save()
                        .then(article => res.status(201).json(article));
                })
                .catch(err =>
                    res.status(404).json({ error: 'article not found' })
                );
        });
    }
);

//@route    POST api/users/articles/like/:slug
// @desc    Like article
// @access  Private

router.post(
    '/dislike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findOne({ articleSlug: req.params.articleSlug })
                .then(article => {
                    if (
                        article.dislikes.filter(
                            like => like.user.toString() === req.user.id
                        ).length > 0
                    ) {
                        return res.status(400).json({
                            error: 'You have already disliked this post',
                        });
                    }
                    const removeIndex = article.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    article.likes.splice(removeIndex, 1);
                    article.dislikes.push({ user: req.user.id });
                    article
                        .save()
                        .then(article => res.status(201).json(article));
                })
                .catch(err =>
                    res.status(404).json({ error: 'article not found' })
                );
        });
    }
);

//@route    POST api/users/articles/dislike/:slug
// @desc    unlike article
// @access  Private

router.post(
    '/undislike/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findOne({ articleSlug: req.params.articleSlug })
                .then(article => {
                    if (
                        article.dislikes.filter(
                            like => like.user.toString() === req.user.id
                        ).length === 0
                    ) {
                        return res.status(400).json({
                            error: 'You have not yet disliked this article',
                        });
                    }
                    const removeIndex = article.dislikes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    article.dislikes.splice(removeIndex, 1);
                    article
                        .save()
                        .then(article => res.status(201).json(article));
                })
                .catch(err =>
                    res.status(404).json({ error: 'article not found' })
                );
        });
    }
);

//@route    POST api/users/articles/comment/slug
// @desc    Add comment to  article
// @access  Private
router.post(
    '/comment/:articleSlug',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Article.findOne({ articleSlug: req.params.articleSlug })
            .then(article => {
                const newComment = {
                    body: req.body.body,
                    name: req.user.username,
                    avatar: req.body.avatar,
                    user: req.user.id,
                };
                article.comments.unshift(newComment);
                article.save().then(article => res.status(200).json(article));
            })
            .catch(err =>
                res.status(404).json({ error: 'article not found ' })
            );
    }
);

//@route    DELETE api/users/articles/comment/slug/:comment_id
// @desc    Remove Comment
// @access  Private
router.delete(
    '/comment/:articleSlug/:id',
    passport.authenticate('jwt', { session: false }, null),
    (req, res) => {
        Article.findOne({ articleSlug: req.params.articleSlug })
            .then(article => {
                if (
                    article.comments.filter(
                        comment =>
                            comment._id.toString() === req.params.id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ error: 'Comment does not exist' });
                }
                const removeIndex = article.comments.map(item =>
                    item._id.toString()).indexOf(req.params.id);
                article.comments.splice(removeIndex, 1);
                article.save().then(article => res.status(201).json({msg:'Comment successfully deleted'}));
            })
            .catch(err =>
                res.status(404).json({ error: 'article not found ' })
            );
    }
);

module.exports = router;
