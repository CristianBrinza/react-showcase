import React, { useState, useRef, useEffect } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import styles from './MarkdownEditor.module.css';
import SourceCode from "../../components/source-code/SourceCode";

const MarkdownEditor: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('# Welcome to the Markdown Editor');
    const editorRef = useRef(null);
    const editorPreviewContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to the top when the component mounts
    useEffect(() => {
        if (editorPreviewContainerRef.current) {
            window.scrollTo({
                top: editorPreviewContainerRef.current.offsetTop - 10,
                behavior: 'smooth', // Optional: for smooth scrolling
            });
        }
    }, []);

    return (
        <div className={styles.container}>
            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/MarkdownEditor" />

            {/* Main content area */}
            <div ref={editorPreviewContainerRef} className={styles.editorPreviewContainer}>
                {/* Markdown editor component */}
                <div className={styles.editorContainer}>
                    <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
                </div>
                {/* Markdown preview component */}
                <div className={styles.previewContainer}>
                    <Preview content={markdown} />
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
