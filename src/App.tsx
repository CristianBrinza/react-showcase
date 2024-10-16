// src/App.tsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Tabulation from './showcase/tabulation/Tabulation';
import DragAndDrop from './showcase/drag-and-drop/DragAndDrop';
import TodoList from './showcase/todo-list/TodoList';
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

    const getComponent = (componentName: string) => {
        switch (componentName) {
            case 'Tabulation':
                return <Tabulation />;
            case 'DragAndDrop':
                return <DragAndDrop />;
            case 'TodoList':
                return <TodoList />;
            default:
                return null;
        }
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
