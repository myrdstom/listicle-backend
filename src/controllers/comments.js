import Article from '../models/Article';

class CommentController {
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
                        comment => comment._id.toString() === req.params.id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ error: 'Comment does not exist' });
                }
                const removeIndex = article.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.id);
                article.comments.splice(removeIndex, 1);
                article
                    .save()
                    .then(article =>
                        res
                            .status(201)
                            .json({ msg: 'Comment successfully deleted' })
                    );
            })
            .catch(err =>
                res.status(404).json({ error: 'article not found ' })
            );
    }

}

export default CommentController