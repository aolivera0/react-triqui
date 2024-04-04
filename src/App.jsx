import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";

const TURNOS = {
  X: "x",
  O: "o",
};

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNOS.X);

  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNOS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=>{
      square != null;
    })
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)){
      setWinner(false);
    }
  

  };

  return (
    <main className="board">
      <h1>Triqui con React </h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNOS.X}>{TURNOS.X}</Square>
        <Square isSelected={turn === TURNOS.O}>{TURNOS.O}</Square>
      </section>
      <section>
        {winner != null && (
          <section className="winner">
            <div className="text">
              <h2>{winner == false ? "Empate" : "Ganó: "}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
