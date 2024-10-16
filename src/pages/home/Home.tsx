// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import pagesData from '../../json/pages.json';

interface Page {
    path: string;
    name: string;
    description: string;
}

const Home: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        setPages(pagesData);
    }, []);

    return (
        <div className={styles.container}>
            <h1>React Showcase</h1>
            <p>Welcome to my React Showcase. Explore the projects below:</p>
            <div className={styles.navGrid}>
                {pages.map((page) => (
                    <Link key={page.path} to={page.path} className={styles.navCard}>
                        <h2>{page.name}</h2>
                        <p>{page.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
