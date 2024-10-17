// src/pages/Not/NotFound.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {

    return (
        <div className={styles.container}>
            <h1>404 - Not Found </h1>

            <Link to={"/"}>Go back home</Link>


        </div>
    );
};

export default NotFound;
