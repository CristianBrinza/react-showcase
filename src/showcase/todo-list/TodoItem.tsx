// src/showcase/todo-list/TodoItem.tsx

import React, { useState, memo } from 'react';
import styles from './TodoItem.module.css';
import { Todo } from './types';
import { useTodoContext } from './TodoContext';
import { useTodoForm } from './useTodos';
import { formatDistanceToNow } from 'date-fns';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
    const { dispatch } = useTodoContext();
    const [isEditing, setIsEditing] = useState(false);
    const { todo: editingTodo, handleChange, handleTagChange, handleDeadlineChange, prepareTodo } =
        useTodoForm(todo);

    /**
     * Toggles the completed state of the todo.
     */
    const toggleComplete = () => {
        dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
    };

    /**
     * Handles the deletion of a todo.
     */
    const deleteTodo = () => {
        dispatch({ type: 'DELETE_TODO', payload: todo.id });
    };

    /**
     * Handles the submission of edited todo.
     */
    const saveTodo = () => {
        dispatch({ type: 'UPDATE_TODO', payload: prepareTodo() });
        setIsEditing(false);
    };

    return (
        <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
            {isEditing ? (
                // Editing mode
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
                    {/* Add components for tags and deadline */}
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
                // Display mode
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
                            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                                ✏️
                            </button>
                            <button onClick={deleteTodo} className={styles.deleteButton}>
                                🗑️
                            </button>
                        </div>
                    </div>
                    <p className={styles.description}>{todo.description}</p>
                    {todo.tags.length > 0 && (
                        <div className={styles.tags}>
                            {todo.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
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
                </div>
            )}
        </div>
    );
});

export default TodoItem;
