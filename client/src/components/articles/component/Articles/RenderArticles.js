import React  from 'react';
import {Link} from 'react-router-dom'
import defaultImage from '../../../../assets/images/articles/default.jpg';


const  RenderArticles =(props) => {
    const {article} = props;
        return (
            <div>
                 <div className="col-md-4">
                    <div className="article__box my-2">
                        <div className="image-container">
                            <img className="article-box__img" src={defaultImage} alt="The article"/>
                        </div>
                        <div className="text-dark">
                            <div className="article__titles">{article.title} </div>
                            <div className="article__authors">LIKES: {article.likes.length - article.dislikes.length} </div>
                            <span className="article__authors">{article.author} </span>
                            <button className="view_article">
                                <Link to={{pathname: `/article/${article.articleSlug}/`}}>More</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default RenderArticles;
