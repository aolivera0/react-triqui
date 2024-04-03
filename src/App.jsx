import "./App.css";
import { useState } from "react";

const TURNOS = {
  X: "x",
  O: "o",
};

const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = ()=>{
    updateBoard()
  }

  return <div onClick={handleClick} className={className}>{children}</div>;
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNOS.X);

  const updateBoard = ()=>{
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurn(newTurn);
  }

  return (
    <main className="board">
      <h1>Triqui con React </h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard = {updateBoard}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNOS.X}>{TURNOS.X}</Square>
        <Square isSelected={turn === TURNOS.O}>{TURNOS.O}</Square>
      </section>
    </main>
  );
}

export default App;
