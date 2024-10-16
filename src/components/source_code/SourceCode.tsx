import React from 'react';
import styles from './SourceCode.module.css';

interface SourceCodeProps {
    link: string;
}

const SourceCode: React.FC<SourceCodeProps> = ({ link }) => {
    return (
        <div className={styles.sourceCode}>
            See the source code here:&nbsp;
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {link}
            </a>
        </div>
    );
};

export default SourceCode;
