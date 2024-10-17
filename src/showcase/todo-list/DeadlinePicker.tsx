// src/showcase/todo-list/DeadlinePicker.tsx

import React from 'react';
import styles from './DeadlinePicker.module.css';

interface DeadlinePickerProps {
    deadline: string | null;
    onChange: (deadline: string | null) => void;
}

const DeadlinePicker: React.FC<DeadlinePickerProps> = ({ deadline, onChange }) => {
    return (
        <div className={styles.deadlinePicker}>
            <label htmlFor="deadline">Deadline:</label>
            <input
                type="date"
                id="deadline"
                value={deadline || ''}
                onChange={(e) => onChange(e.target.value || null)}
                className={styles.input}
            />
        </div>
    );
};

export default DeadlinePicker;
