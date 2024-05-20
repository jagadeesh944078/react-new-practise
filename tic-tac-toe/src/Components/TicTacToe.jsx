import useTictacToe from "../hooks/useTictactoe";

const TicTacToe = ({ size }) => {
  const { board, handleClick, calculateWinner, resetGame, getStatusMessage } =
    useTictacToe(size);

  const gridTemplateColumns = `repeat(${size}, 1fr)`;
  return (
    <div className="game">
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="board" style={{ gridTemplateColumns }}>
        {board.map((b, index) => {
          return (
            <button
              key={index}
              className="cell"
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
