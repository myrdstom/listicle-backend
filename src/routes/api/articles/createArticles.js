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
            author: req.user.firstName + ' ' + req.user.lastName,
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
            Article.findOne({ articleSlug: req.params.articleSlug }).then(
                article => {
                    if (!article) {
                        return res
                            .status(404)
                            .json({ error: 'Article not found' });
                    }
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
                }
            );
        });
    }
);

module.exports = router;
