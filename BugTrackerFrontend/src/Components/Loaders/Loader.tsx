import React from 'react';
import { CircleLoader } from 'react-spinners';
import "../../Styles/Loader.css"

function Loader() {
    return (
        <div id="loader">
            <CircleLoader color="#058ED9" />
        </div>
    );
}

export default Loader;