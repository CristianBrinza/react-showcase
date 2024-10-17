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
        const newTag = inputValue.trim();
        if (newTag && !tags.includes(newTag)) {
            onChange([...tags, newTag]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
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
                onKeyDown={handleKeyDown}
                placeholder="Add a tag"
                className={styles.input}
            />
        </div>
    );
};

export default TagInput;
