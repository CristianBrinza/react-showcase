// src/showcase/TicTacToe/Board.tsx

import React from 'react';
import Square from './Square';
import styles from './Board.module.css';

interface BoardProps {
    squares: Array<'X' | 'O' | null>;
    onClick: (index: number) => void;
    winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
    // Render squares
    const renderSquare = (index: number) => {
        const isWinningSquare = winningLine ? winningLine.includes(index) : false;
        return (
            <Square
                value={squares[index]}
                onClick={() => onClick(index)}
                isWinningSquare={isWinningSquare}
            />
        );
    };

    return (
        <div className={styles.board}>
            <div className={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

export default Board;
