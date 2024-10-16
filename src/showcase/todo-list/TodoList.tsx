// src/showcase/todo-list/TodoList.tsx

import React, { useState, Suspense, lazy } from 'react';
import styles from './TodoList.module.css';
import { useTodoContext } from './TodoContext';
import { useTodoForm } from './useTodos';
import { TodoProvider } from './TodoContext';
import LoadingSpinner from './common/LoadingSpinner';

const TodoItem = lazy(() => import('./TodoItem'));

const TodoList: React.FC = () => {
    const { todos, dispatch } = useTodoContext();
    const { todo, handleChange, handleTagChange, handleDeadlineChange, resetForm, prepareTodo } =
        useTodoForm();
    const [showForm, setShowForm] = useState(false);

    /**
     * Handles adding a new todo.
     */
    const addTodo = () => {
        if (todo.title.trim()) {
            dispatch({ type: 'ADD_TODO', payload: prepareTodo() });
            resetForm();
            setShowForm(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Todo List</h1>
            <button onClick={() => setShowForm((prev) => !prev)} className={styles.addButton}>
                {showForm ? 'Close Form' : 'Add Todo'}
            </button>
            {showForm && (
                <div className={styles.form}>
                    <input
                        name="title"
                        value={todo.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className={styles.input}
                    />
                    <textarea
                        name="description"
                        value={todo.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className={styles.textarea}
                    />
                    {/* Add components for tags and deadline */}
                    <div className={styles.actions}>
                        <button onClick={addTodo} className={styles.saveButton}>
                            Add Todo
                        </button>
                        <button onClick={resetForm} className={styles.cancelButton}>
                            Reset
                        </button>
                    </div>
                </div>
            )}
            <Suspense fallback={<LoadingSpinner />}>
                <div className={styles.todoList}>
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
};

const TodoListWrapper: React.FC = () => (
    <TodoProvider>
        <TodoList />
    </TodoProvider>
);

export default TodoListWrapper;
