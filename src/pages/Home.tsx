import React from 'react';
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <ul>
                <li><Link to="/tabulation">Tabulation</Link></li>
                <li><Link to="/drag-and-drop">Drag and Drop</Link></li>
                {/* Add more links for other showcases */}
            </ul>
        </div>
    );
};

export default Home;
