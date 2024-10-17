// src/showcase/TodoList/utils.ts

const tagColors: { [key: string]: string } = {};

export const getTagColor = (tag: string): string => {
    if (tagColors[tag]) {
        return tagColors[tag];
    }
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)+'7a'; // Generate random color
    tagColors[tag] = color;
    return color;
};
