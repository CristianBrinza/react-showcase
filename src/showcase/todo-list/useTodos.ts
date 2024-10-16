// src/showcase/todo-list/useTodos.ts

import { useState, useCallback } from 'react';
import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid'; // Using the UUID module

export const useTodoForm = (initialTodo?: Todo) => {
    const [todo, setTodo] = useState<Todo>(
        initialTodo || {
            id: '',
            title: '',
            description: '',
            completed: false,
            tags: [],
            deadline: null,
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

    const resetForm = useCallback(() => {
        setTodo({
            id: '',
            title: '',
            description: '',
            completed: false,
            tags: [],
            deadline: null,
        });
    }, []);

    const prepareTodo = useCallback(() => {
        return { ...todo, id: todo.id || uuidv4() }; // Using uuidv4 for unique ID
    }, [todo]);

    return {
        todo,
        handleChange,
        handleTagChange,
        handleDeadlineChange,
        resetForm,
        prepareTodo,
    };
};
