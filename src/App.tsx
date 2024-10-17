// src/App.tsx

import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import pagesData from './json/pages.json';

interface Page {
    path: string;
    component: string;
}

function App() {
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        setPages(pagesData);
    }, []);

    // Function to dynamically import components
    const getComponent = (componentName: string) => {
        const Component = lazy(() => import(`./showcase/${componentName}/${componentName}`));
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {pages.map((page) => (
                    <Route key={page.path} path={page.path} element={getComponent(page.component)} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
