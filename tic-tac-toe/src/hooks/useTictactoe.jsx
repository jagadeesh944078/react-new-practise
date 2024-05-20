import { useState } from "react";

const useTictacToe = (pattern) => {
  const initialBoard = () => Array(pattern * pattern).fill(null);
  const [board, setBoard] = useState(initialBoard());
  console.log(board);
  const [isXNext, setISNext] = useState(true);

  function generateWinPatterns(size) {
    const winPatterns = [];

    // Rows
    for (let i = 0; i < size; i++) {
      const rowPattern = [];
      for (let j = 0; j < size; j++) {
        rowPattern.push(i * size + j);
      }
      winPatterns.push(rowPattern);
    }

    // Columns
    for (let i = 0; i < size; i++) {
      const colPattern = [];
      for (let j = 0; j < size; j++) {
        colPattern.push(j * size + i);
      }
      winPatterns.push(colPattern);
    }

    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
      diag2.push(i * size + (size - 1 - i));
    }
    winPatterns.push(diag1);
    winPatterns.push(diag2);

    return winPatterns;
  }

  const WINNING_PATTERNS = generateWinPatterns(pattern);
  //   const WINNING_PATTERNS = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [6, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  function calculateWinner(board, winPatterns) {
    for (const pattern of winPatterns) {
      const winnerCells = pattern.filter((cellIndex) => board[cellIndex]); // Filter cells with a value (X or O)
      if (
        winnerCells.length === pattern.length &&
        winnerCells.every((cellIndex) => board[cellIndex] === board[pattern[0]])
      ) {
        return board[pattern[0]]; // Return the winner ('X' or 'O')
      }
    }
    return null; // No winner yet
  }

  const handleClick = (index) => {
    const winner = calculateWinner(board, WINNING_PATTERNS);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setISNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board, WINNING_PATTERNS);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every((cell) => cell)) {
      return "Draw! No winner.";
    } else {
      return `Next player: ${isXNext ? "X" : "O"}`;
    }
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setISNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};

export default useTictacToe;
