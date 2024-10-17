// src/showcase/todo-list/TodoList.tsx

import React, {useState, Suspense, lazy, useMemo} from 'react';
import styles from './TodoList.module.css';
import { useTodoContext } from './TodoContext';
import { useTodoForm } from './useTodos';
import { TodoProvider } from './TodoContext';
import LoadingSpinner from './common/LoadingSpinner';


const TodoItem = lazy(() => import('./TodoItem'));

const TodoList: React.FC = () => {
    const { todos, dispatch } = useTodoContext();
    const { todo, handleChange, resetForm, prepareTodo } =
        useTodoForm();
    const [showForm, setShowForm] = useState(false);
    const [sortOption, setSortOption] = useState<string>('date');
    const [filterTag, setFilterTag] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');


    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handleFilterTagChange = (tag: string) => {
        setFilterTag(tag);
    };

    const handleFilterCategoryChange = (category: string) => {
        setFilterCategory(category);
    };


    const filteredTodos = useMemo(() => {
        let tempTodos = [...todos];

        if (filterTag) {
            tempTodos = tempTodos.filter((todo) => todo.tags.includes(filterTag));
        }

        if (filterCategory) {
            tempTodos = tempTodos.filter((todo) => todo.category === filterCategory);
        }

        switch (sortOption) {
            case 'date':
                tempTodos.sort((a, b) => (a.deadline || '').localeCompare(b.deadline || ''));
                break;
            case 'favorite':
                tempTodos.sort((a, b) => Number(b.favorite) - Number(a.favorite));
                break;
            // Add more sorting options as needed
        }

        return tempTodos;
    }, [todos, filterTag, filterCategory, sortOption]);


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
