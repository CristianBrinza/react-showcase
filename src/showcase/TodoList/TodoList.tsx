// src/showcase/TodoList/TodoList.tsx

import React, { useState, Suspense, lazy, useMemo } from 'react';
import styles from './TodoList.module.css';
import { useTodoContext } from './TodoContext';
import { useTodoForm } from './useTodos';
import { TodoProvider } from './TodoContext';
import LoadingSpinner from './common/LoadingSpinner';
import TagInput from './TagInput';
import DeadlinePicker from './DeadlinePicker';
import CategorySelect from './CategorySelect';
import { Todo } from './types';
import SourceCode from "../../components/source-code/SourceCode";

const TodoItem = lazy(() => import('./TodoItem'));

const TodoList: React.FC = () => {
    const { todos, dispatch } = useTodoContext();
    const {
        todo,
        handleChange,
        handleTagChange,
        handleDeadlineChange,
        handleCategoryChange,
        resetForm,
        prepareTodo,
    } = useTodoForm();
    const [showForm, setShowForm] = useState(false);
    const [sortOption, setSortOption] = useState<string>('date');
    const [filterTag, setFilterTag] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handleFilterTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterTag(e.target.value);
    };

    const handleFilterCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(e.target.value);
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
            default:
                break;
        }

        return tempTodos;
    }, [todos, filterTag, filterCategory, sortOption]);

    const addTodo = () => {
        if (todo.title.trim()) {
            dispatch({ type: 'ADD_TODO', payload: prepareTodo() });
            resetForm();
            setShowForm(false);
        }
    };

    return (
        <div className={styles.container}>

            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/todo-list"/>

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
                    <TagInput tags={todo.tags} onChange={handleTagChange} />
                    <DeadlinePicker deadline={todo.deadline} onChange={handleDeadlineChange} />
                    <CategorySelect
                        category={todo.category}
                        categories={['Work', 'Personal', 'Urgent']}
                        onChange={handleCategoryChange}
                    />
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
            {/* Sorting and Filtering Controls */}
            <div className={styles.controls}>
                <div className={styles.controlGroup}>
                    <label htmlFor="sort">Sort By:  </label>
                    <select id="sort" value={sortOption} onChange={handleSortChange}>
                        <option value="date">Deadline</option>
                        <option value="favorite">Favorite</option>
                    </select>
                </div>
                <div className={styles.controlGroup}>
                    <label htmlFor="filterTag">Filter by Tag:  </label>
                    <select id="filterTag" value={filterTag} onChange={handleFilterTagChange}>
                        <option value="">All</option>
                        {Array.from(new Set(todos.flatMap((todo) => todo.tags))).map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.controlGroup}>
                    <label htmlFor="filterCategory">Filter by Category:  </label>
                    <select id="filterCategory" value={filterCategory} onChange={handleFilterCategoryChange}>
                        <option value="">All</option>
                        {Array.from(new Set(todos.map((todo) => todo.category))).map(
                            (category) =>
                                category && (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                )
                        )}
                    </select>
                </div>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
                <div className={styles.todoList}>
                    {filteredTodos.map((todo: Todo) => (
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
