import React, { useState, useRef } from 'react';
import styles from './DragAndDrop.module.css';
import SourceCode from "../../components/source-code/SourceCode";

interface Item {
    id: number;
    text: string;
    color?: string;
}

const initialItems: Item[] = [
    { id: 1, text: 'Item 1', color: '#ff00002e' },
    { id: 2, text: 'Item 2', color: '#0048ff2e' },
    { id: 3, text: 'Item 3', color: '#ff00fb2e' },
    { id: 4, text: 'Item 4', color: '#00ffb72e' },
];

const DragAndDrop: React.FC = () => {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [useBackgroundColor, setUseBackgroundColor] = useState<boolean>(false);

    // Refs to keep track of dragged items
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleDragStart = (position: number) => {
        dragItem.current = position;
        // Disable scrolling when dragging starts
        document.body.style.overflow = 'hidden';
    };

    const handleDragEnter = (position: number) => {
        dragOverItem.current = position;
    };

    const handleDragEnd = () => {
        const newItems = [...items];
        const draggedItemContent = newItems[dragItem.current!];

        // Remove the dragged item and insert it at the new position
        newItems.splice(dragItem.current!, 1);
        newItems.splice(dragOverItem.current!, 0, draggedItemContent);

        setItems(newItems);
        dragItem.current = null;
        dragOverItem.current = null;

        // Enable scrolling again after dragging
        document.body.style.overflow = 'auto';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Touch events
    const handleTouchStart = (index: number) => {
        dragItem.current = index;
        document.body.style.overflow = 'hidden'; // Disable scrolling on touch start
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault(); // Prevent screen movement
        const touch = e.touches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        if (targetElement?.getAttribute('data-index')) {
            dragOverItem.current = Number(targetElement.getAttribute('data-index'));
        }
    };

    const handleTouchEnd = () => {
        handleDragEnd();
        document.body.style.overflow = 'auto'; // Re-enable scrolling on touch end
    };

    const toggleBackgroundColor = () => {
        setUseBackgroundColor((prev) => !prev);
    };

    return (
        <div className={styles.container}>

            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/DragAndDrop" />

            <h1>Drag and Drop Showcase</h1>
            <div className={styles.dragList}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        data-index={index}
                        className={styles.dragItem}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        onTouchStart={() => handleTouchStart(index)}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{ backgroundColor: useBackgroundColor ? item.color || '#fff' : '#fff' }}
                    >
                        {item.text}
                    </div>
                ))}
                {/* Checkbox to toggle background color */}
                <div className={styles.checkboxContainer}>
                    <label>
                        <input
                            type="checkbox"
                            checked={useBackgroundColor}
                            onChange={toggleBackgroundColor}
                        />
                        &nbsp;Enable Cards Color
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
