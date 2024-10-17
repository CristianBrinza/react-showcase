// src/showcase/todo-list/CategorySelect.tsx

import React from 'react';
import styles from './CategorySelect.module.css';

interface CategorySelectProps {
    category: string;
    categories: string[];
    onChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, categories, onChange }) => {
    return (
        <div className={styles.categorySelect}>
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                value={category}
                onChange={(e) => onChange(e.target.value)}
                className={styles.select}
            >
                <option value="">None</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
