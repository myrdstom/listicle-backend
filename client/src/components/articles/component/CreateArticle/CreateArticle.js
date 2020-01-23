import React, { Component } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.modules = {
            toolbar: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image', 'video'][{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['clean'],
                ['code-block'],
            ],
        };
        this.formats = [
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'link',
            'image',
            'video',
            'code-block',
            'align',
            'color',
            'background',
        ];
    }

    render() {
        const {
            title,
            onChange,
            onSubmit,
            onHandleChange,
        } = this.props;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <form onSubmit={onSubmit}>
                            <br />
                            <br />
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control-lg article__input"
                                    name="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={onChange}
                                    id="title"
                                    required
                                />
                            </div>
                            <br />
                            <br />
                            <div className="form-group">
                                <ReactQuill
                                    theme="bubble"
                                    className="react-quill"
                                    name="body"
                                    placeholder="Tell your story..."
                                    modules={this.modules}
                                    formats={this.formats}
                                    onChange={onHandleChange}
                                    id="body"
                                />
                            </div>
                            <br />
                            <input
                                type="submit"
                                className="btn btn-outline-primary"
                                value="Save"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateArticle;
