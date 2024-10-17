// src/showcase/TodoList/useTodos.ts

import { useState, useCallback } from 'react';
import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid';

export const useTodoForm = (initialTodo?: Todo) => {
    const [todo, setTodo] = useState<Todo>(
        initialTodo || {
            id: '',
            title: '',
            description: '',
            completed: false,
            tags: [],
            deadline: null,
            category: '',
            favorite: false,
        }
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setTodo((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleTagChange = useCallback((tags: string[]) => {
        setTodo((prev) => ({ ...prev, tags }));
    }, []);

    const handleDeadlineChange = useCallback((deadline: string | null) => {
        setTodo((prev) => ({ ...prev, deadline }));
    }, []);

    const handleCategoryChange = useCallback((category: string) => {
        setTodo((prev) => ({ ...prev, category }));
    }, []);

    const resetForm = useCallback(() => {
        setTodo({
            id: '',
            title: '',
            description: '',
            completed: false,
            tags: [],
            deadline: null,
            category: '',
            favorite: false,
        });
    }, []);

    const prepareTodo = useCallback(() => {
        return { ...todo, id: todo.id || uuidv4() };
    }, [todo]);

    return {
        todo,
        handleChange,
        handleTagChange,
        handleDeadlineChange,
        handleCategoryChange,
        resetForm,
        prepareTodo,
    };
};
