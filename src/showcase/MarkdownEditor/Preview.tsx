import React, { useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism';
import 'prismjs/themes/prism.css'; // Import PrismJS theme for syntax highlighting
import styles from './Preview.module.css';

interface PreviewProps {
    content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
    const md = new MarkdownIt().use(prism);

    useEffect(() => {
        // Any side-effects or additional processing can go here
    }, [content]);

    return (
        <div
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: md.render(content) }}
        ></div>
    );
};

export default Preview;
