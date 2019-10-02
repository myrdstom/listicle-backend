import Article from '../models/Article';

const errors = {};
class SearchController {
    static async searchArticles(req, res) {
        Article.find().then(articles => {
            const search = req.query.results;
            const searchedArticle = [];
            for (let article of articles) {
                if (
                    article.author
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    article.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    article.body.toLowerCase().includes(search.toLowerCase()) ||
                    article.description
                        .toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    searchedArticle.push(article);
                }
            }
            if (searchedArticle.length === 0) {
                errors.error = 'There are no articles with these parameters';
                return res.status(200).json(errors);
            }
            return res.json(searchedArticle);
        });
    }

}

export default SearchController
