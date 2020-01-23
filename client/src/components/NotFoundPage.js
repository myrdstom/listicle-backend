import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div>
            <div className="center-div">
                <h1 className="display-1 d-flex justify-content-center">404</h1>
                <h3 className="not-found d-flex justify-content-center">
                    <strong>Oh Snap!!</strong> &nbsp; Seems you took a wrong
                    turn somewhere
                </h3>
                <br />
                <p className="d-flex justify-content-center">
                    <Link to="/">
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                        >
                            Back to Home
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
