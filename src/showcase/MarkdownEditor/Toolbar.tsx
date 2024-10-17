// src/showcase/MarkdownEditor/Toolbar.tsx

import React from 'react';
import styles from './Toolbar.module.css';

interface ToolbarProps {
    onAction: (action: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAction }) => {
    return (
        <div className={styles.toolbar}>
            {/* Bold button */}
            <button onClick={() => onAction('bold')} title="Bold (Ctrl+B)">
                <b>B</b>
            </button>
            {/* Italic button */}
            <button onClick={() => onAction('italic')} title="Italic (Ctrl+I)">
                <i>I</i>
            </button>
            {/* Code button */}
            <button onClick={() => onAction('code')} title="Code (Ctrl+`)">
                <code>&lt;/&gt;</code>
            </button>
            {/* Add more buttons as needed */}
        </div>
    );
};

export default Toolbar;
