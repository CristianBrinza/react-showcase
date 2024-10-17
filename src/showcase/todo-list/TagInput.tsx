// src/showcase/todo-list/TagInput.tsx

import React, { useState } from 'react';
import styles from './TagInput.module.css';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const addTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            onChange([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className={styles.tagInput}>
            <div className={styles.tags}>
                {tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
            {tag}
                        <button onClick={() => removeTag(tag)} className={styles.removeButton}>
              ×
            </button>
          </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add a tag"
                className={styles.input}
            />
        </div>
    );
};

export default TagInput;
