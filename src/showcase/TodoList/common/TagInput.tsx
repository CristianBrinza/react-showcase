// src/showcase/common/TagInput.tsx

import React, { useState, useRef } from 'react';
import styles from './TagInput.module.css';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const addTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            onChange([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        onChange(newTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className={styles.tagInput}>
            <div className={styles.tags}>
                {tags.map((tag, index) => (
                    <span key={tag} className={styles.tag}>
            {tag}
                        <button onClick={() => removeTag(index)} className={styles.removeButton}>
              ×
            </button>
          </span>
                ))}
            </div>
            <input
                ref={inputRef}
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
