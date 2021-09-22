import React, { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loader() {

    let [loading, setLoading] = useState(true);


    return (
        <div style={{marginTop:'300px'}}>

            <div className="sweet-loading text-center">
                <HashLoader color='#0000' loading={loading} css='' size={70} />
            </div>

        </div>
    )
}

export default Loader;