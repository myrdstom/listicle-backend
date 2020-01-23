import React from 'react';

function CreateComment(props) {
    const { body, onChange, onSubmit, username } = props;

    return (
        <div className="create__comment-container">
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-11">
                    <div className="post__comment">
                        <form onSubmit={onSubmit}>
                            <label className="comment__user" htmlFor="body">Comment as <span className="comment__username">{username}</span></label>
                            <input
                                type="text"
                                className="form-control comment__input"
                                name="body"
                                placeholder="Add a comment"
                                value={body}
                                onChange={onChange}
                                id="firstName"
                                required
                            />
                            <br/>
                            <input
                                type="submit"
                                className="btn btn-outline-secondary my-2 my-sm-0"
                                value=" Comment "
                            />
                        </form>
                    </div>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        </div>
    );
}

export default CreateComment;
