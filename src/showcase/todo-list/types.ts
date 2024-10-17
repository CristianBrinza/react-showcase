// src/showcase/todo-list/types.ts

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    tags: string[];
    deadline: string | null;
    category: string;
    favorite: boolean;
}

export type TodoAction =
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'UPDATE_TODO'; payload: Todo }
    | { type: 'DELETE_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: string }
    | { type: 'TOGGLE_FAVORITE'; payload: string };

export interface TodoContextProps {
    todos: Todo[];
    dispatch: React.Dispatch<TodoAction>;
}
