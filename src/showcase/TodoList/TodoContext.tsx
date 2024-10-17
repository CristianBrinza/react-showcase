// src/showcase/TodoList/TodoContext.tsx

import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { Todo, TodoAction, TodoContextProps } from './types';

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [action.payload, ...state];
        case 'UPDATE_TODO':
            return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.payload);
        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'TOGGLE_FAVORITE':
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, favorite: !todo.favorite } : todo
            );
        default:
            return state;
    }
};

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, [], () => {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return <TodoContext.Provider value={{ todos, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodoContext = (): TodoContextProps => {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
