import React from 'react';
import "../../Styles/NotFound.css"

function NotFound() {
    return (
        <div id="not-found">
            <h3>Nothing found matching that url.</h3>
            <a href="/">Back to dashboard</a>
        </div>
    );
}

export default NotFound;