import Article from '../models/Article';
import Profile from '../models/Profile';
import ValidateArticleInput from '../validation/articles/articles';

const errors = {};
class ArticleController {
    static async getArticles(req, res) {
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

    static async getSingleArticle(req, res, next) {
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

    static async createArticle(req, res) {
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

}

export default ArticleController;
