// src/showcase/TicTacToe/TicTacToe.tsx

import React, { useState, useEffect } from 'react';
import Board from './Board';
import styles from './TicTacToe.module.css';
import SourceCode from '../../components/source-code/SourceCode';

const TicTacToe: React.FC = () => {
    type Player = 'X' | 'O';
    type Winner = Player | 'Draw';

    const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<'HUMAN' | 'AI'>('HUMAN');
    const [score, setScore] = useState<{ X: number; O: number; Draws: number }>({
        X: 0,
        O: 0,
        Draws: 0,
    });
    const [status, setStatus] = useState<string>('Next player: X');
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const [feedback, setFeedback] = useState<string>('');

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal
        [2, 4, 6], // Diagonal
    ];

    // Check for winner
    const calculateWinner = (squares: Array<Player | null>): { winner: Winner; line: number[] } | null => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a] as Winner, line: combo }; // Cast squares[a] as Winner
            }
        }
        if (squares.every((square) => square !== null)) {
            return { winner: 'Draw', line: [] };
        }
        return null;
    };
    // Handle click on a square
    const handleClick = (index: number) => {
        if (board[index] || gameOver) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        const result = calculateWinner(newBoard);
        if (result) {
            endGame(result.winner, result.line);
        } else {
            setIsXNext(!isXNext);
            setStatus(`Next player: ${!isXNext ? 'X' : 'O'}`);
        }
    };

    // Handle AI move
    useEffect(() => {
        if (gameMode === 'AI' && !isXNext && !gameOver) {
            const timer = setTimeout(() => {
                const aiMove = getBestMove(board);
                handleClick(aiMove);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isXNext, gameMode, gameOver]);

    // Get best move for AI using Minimax algorithm
    const getBestMove = (currentBoard: Array<Player | null>): number => {
        const availableMoves = currentBoard
            .map((value, index) => (value === null ? index : null))
            .filter((val) => val !== null) as number[];

        let bestScore = -Infinity;
        let move = availableMoves[0];

        for (let i of availableMoves) {
            const boardCopy = [...currentBoard];
            boardCopy[i] = 'O';
            const score = minimax(boardCopy, 0, false);
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
        return move;
    };

    // Minimax algorithm
    const minimax = (
        newBoard: Array<Player | null>,
        depth: number,
        isMaximizing: boolean
    ): number => {
        const result = calculateWinner(newBoard);
        if (result) {
            const { winner } = result;
            if (winner === 'O') return 10 - depth;
            if (winner === 'X') return depth - 10;
            return 0;
        }

        const availableMoves = newBoard
            .map((value, index) => (value === null ? index : null))
            .filter((val) => val !== null) as number[];

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i of availableMoves) {
                const boardCopy = [...newBoard];
                boardCopy[i] = 'O';
                const score = minimax(boardCopy, depth + 1, false);
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i of availableMoves) {
                const boardCopy = [...newBoard];
                boardCopy[i] = 'X';
                const score = minimax(boardCopy, depth + 1, true);
                bestScore = Math.min(score, bestScore);
            }
            return bestScore;
        }
    };

    // End game and update score
    const endGame = (winner: Winner, line: number[]) => {
        setGameOver(true);
        setWinningLine(line);

        if (winner === 'Draw') {
            setStatus('Game is a Draw!');
            setFeedback('Better luck next time!');
            setScore((prevScore) => ({ ...prevScore, Draws: prevScore.Draws + 1 }));
        } else {
            setStatus(`Winner: ${winner}`);
            setFeedback(`Congratulations Player ${winner}!`);
            setScore((prevScore) => ({
                ...prevScore,
                [winner]: prevScore[winner] + 1,
            }));
        }
    };

    // Reset game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setStatus('Next player: X');
        setGameOver(false);
        setWinningLine(null);
        setFeedback('');
    };

    // Change game mode
    const changeGameMode = (mode: 'HUMAN' | 'AI') => {
        setGameMode(mode);
        resetGame();
    };

    return (
        <div className={styles.container}>
            <SourceCode link="https://github.com/CristianBrinza/react-showcase/tree/main/src/showcase/TicTacToe" />
            <h1>Tic-Tac-Toe</h1>

            <div className={styles.gameInfo}>
                <div className={styles.status}>{status}</div>
                <div className={styles.scoreboard}>
                    <div>
                        <span className={styles.playerX}>Player X: {score.X}</span>
                    </div>
                    <div>
                        <span className={styles.playerO}>Player O: {score.O}</span>
                    </div>
                    <div>
                        <span className={styles.draws}>Draws: {score.Draws}</span>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className="btn" onClick={resetGame}>
                        Restart Game
                    </button>
                    <button className="btn" onClick={() => changeGameMode(gameMode === 'HUMAN' ? 'AI' : 'HUMAN')}>
                        {gameMode === 'HUMAN' ? 'Play vs AI' : 'Play vs Human'}
                    </button>
                </div>
            </div>

            <Board squares={board} onClick={handleClick} winningLine={winningLine} />

            {/* Feedback Text */}
            {feedback && <div className={styles.feedback}>{feedback}</div>}
        </div>
    );
};

export default TicTacToe;
