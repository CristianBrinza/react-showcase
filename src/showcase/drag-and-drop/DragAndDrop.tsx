// src/drag-and-drop/DragAndDrop.tsx

import React, { useState, useRef} from 'react';
import styles from './DragAndDrop.module.css';
import SourceCode from "../../components/source-code/SourceCode";

interface Item {
    id: number;
    text: string;
}

const initialItems: Item[] = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
];

const DragAndDrop: React.FC = () => {
    const [items, setItems] = useState<Item[]>(initialItems);

    // Refs to keep track of dragged items
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    /**
     * Handles the drag start event.
     * @param position - The index of the item being dragged.
     */
    const handleDragStart = (position: number) => {
        dragItem.current = position;
    };

    /**
     * Handles the drag enter event.
     * @param position - The index of the item being hovered over.
     */
    const handleDragEnter = (position: number) => {
        dragOverItem.current = position;
    };

    /**
     * Handles the drag end event and updates the items array.
     */
    const handleDragEnd = () => {
        const newItems = [...items];
        const draggedItemContent = newItems[dragItem.current!];

        // Remove the dragged item and insert it at the new position
        newItems.splice(dragItem.current!, 1);
        newItems.splice(dragOverItem.current!, 0, draggedItemContent);

        setItems(newItems);
        dragItem.current = null;
        dragOverItem.current = null;
    };

    /**
     * Prevents the default behavior of the drag over event.
     * @param e - The drag over event.
     */
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className={styles.container}>

            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/drag-and-drop"/>

            <h1>Drag and Drop Showcase</h1>
            <div className={styles.dragList}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={styles.dragItem}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragAndDrop;
