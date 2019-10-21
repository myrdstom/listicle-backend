import Article from '../models/Article';
import Profile from '../models/Profile';

class LikesAndDislikesController{

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

}

export default  LikesAndDislikesController