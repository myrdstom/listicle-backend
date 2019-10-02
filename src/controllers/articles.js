import Article from '../models/Article';
import Profile from '../models/Profile';
import ValidateArticleInput from '../validation/articles/articles';

const errors = {};
class ArticleController {
    static async getArticles(req,res){

        Article.find()
            .sort({ createdAt: -1 })
            .then(articles => {
                if (articles.length === 0) {
                    errors.error = 'This database has no articles';
                    return res.status(200).json(errors);
                }
                res.json(articles);
            });

    }

    static async getSingleArticle(req, res, next){
        await Article.findOne({ articleSlug: req.params.articleSlug }).then(
            article => {
                if (!article) {
                    errors.error = 'This article does not exist';
                    return res.status(404).json(errors);
                }
                res.status(200).json(article);
            }
        );

    }

    static async createArticle(req, res){
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

    static async deleteArticle(req, res) {
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

    static async likeArticle(req, res) {
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


    static async unlikeArticle(req, res) {
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

    static async dislikeArticle(req, res) {
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

    static async undislikeArticle(req, res) {
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

    static async commentOnArticle(req, res) {
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

    static async deleteComment(req, res) {
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

}

export default ArticleController