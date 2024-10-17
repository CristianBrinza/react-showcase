// src/showcase/TicTacToe/Square.tsx

import React from 'react';
import styles from './Square.module.css';

interface SquareProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
    isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
    return (
        <button
            className={`${styles.square} ${isWinningSquare ? styles.winningSquare : ''}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;
