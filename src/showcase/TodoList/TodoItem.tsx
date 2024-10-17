// src/showcase/TodoList/TodoItem.tsx

import React, { useState, memo } from 'react';
import styles from './TodoItem.module.css';
import { Todo } from './types';
import { useTodoContext } from './TodoContext';
import { useTodoForm } from './useTodos';
import { formatDistanceToNow } from 'date-fns';
import { ReactComponent as StarIcon } from './icons/star.svg';
import { ReactComponent as EditIcon } from './icons/edit.svg';
import { ReactComponent as DeleteIcon } from './icons/delete.svg';
import TagInput from './TagInput';
import DeadlinePicker from './DeadlinePicker';
import CategorySelect from './CategorySelect';
import { getTagColor } from './utils';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
    const { dispatch } = useTodoContext();
    const [isEditing, setIsEditing] = useState(false);
    const {
        todo: editingTodo,
        handleChange,
        handleTagChange,
        handleDeadlineChange,
        handleCategoryChange,
        prepareTodo,
    } = useTodoForm(todo);

    const toggleComplete = () => {
        dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
    };

    const deleteTodo = () => {
        dispatch({ type: 'DELETE_TODO', payload: todo.id });
    };

    const toggleFavorite = () => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: todo.id });
    };

    const saveTodo = () => {
        dispatch({ type: 'UPDATE_TODO', payload: prepareTodo() });
        setIsEditing(false);
    };

    return (
        <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            {isEditing ? (
                <div className={styles.editForm}>
                    <input
                        name="title"
                        value={editingTodo.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className={styles.input}
                    />
                    <textarea
                        name="description"
                        value={editingTodo.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className={styles.textarea}
                    />
                    <TagInput tags={editingTodo.tags} onChange={handleTagChange} />
                    <DeadlinePicker deadline={editingTodo.deadline} onChange={handleDeadlineChange} />
                    <CategorySelect
                        category={editingTodo.category}
                        categories={['Work', 'Personal', 'Urgent']}
                        onChange={handleCategoryChange}
                    />
                    <div className={styles.actions}>
                        <button onClick={saveTodo} className={styles.saveButton}>
                            Save
                        </button>
                        <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.displayMode}>
                    <div className={styles.header}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={toggleComplete}
                            className={styles.checkbox}
                        />
                        <h3 className={styles.title}>{todo.title}</h3>

                        <div className={styles.actions}>
                            <button onClick={toggleFavorite} className={styles.iconButton} aria-label="Favorite">
                                <StarIcon className={todo.favorite ? styles.favorited : styles.unfavorited} />
                            </button>
                            <button onClick={() => setIsEditing(true)} className={styles.iconButton} aria-label="Edit">
                                <EditIcon />
                            </button>
                            <button onClick={deleteTodo} className={styles.iconButton} aria-label="Delete">
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                    <p className={styles.description}>{todo.description}</p>
                    {todo.tags.length > 0 && (
                        <div className={styles.tags}>
                            {todo.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={styles.tag}
                                    style={{ backgroundColor: getTagColor(tag) }}
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                    {todo.deadline && (
                        <div className={styles.deadline}>
                            Due {formatDistanceToNow(new Date(todo.deadline), { addSuffix: true })}
                        </div>
                    )}
                    {/* Progress Bar */}
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progress}
                            style={{ width: todo.completed ? '100%' : '0%' }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default TodoItem;
