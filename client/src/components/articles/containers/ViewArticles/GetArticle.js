import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';

class GetArticle extends Component {
    render() {
        const {articles} = this.props;
        return  (
            <div>
                <div className="row mx-5 my-5">
                    { articles.map(article => <ArticleItem key={article._id} article={article}/>)}
                </div>

            </div>
        )
    }
}

GetArticle.propTypes = {
    articles: PropTypes.array.isRequired
};

export default GetArticle;
