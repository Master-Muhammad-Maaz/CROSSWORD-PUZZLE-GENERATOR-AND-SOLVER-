"use client";
import { useState } from 'react';

const INITIAL_GRID = [
  ['R', 'E', 'A', 'C', 'T'],
  ['', '', '', 'O', ''],
  ['', '', '', 'D', ''],
  ['', '', '', 'E', ''],
  ['', '', '', '', ''],
];

const HINTS = [
  "Across: Popular JS Library (5 letters)",
  "Down: What we write in Editor (4 letters)"
];

export default function Crossword() {
  const [grid, setGrid] = useState(Array(5).fill(Array(5).fill('')));
  const [status, setStatus] = useState("");

  const handleChange = (row, col, value) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value.toUpperCase() : c))
    );
    setGrid(newGrid);
  };

  const checkResult = () => {
    let isCorrect = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (INITIAL_GRID[r][c] !== '' && grid[r][c] !== INITIAL_GRID[r][c]) {
          isCorrect = false;
        }
      }
    }
    setStatus(isCorrect ? "✅ Perfect! Sab sahi hai." : "❌ Kuch galat hai, phir se check karein.");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Crossword Generator</h1>
      
      <div className="grid grid-cols-5 gap-1 bg-gray-400 p-1 border-2 border-gray-600">
        {grid.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <input
              key={`${rIndex}-${cIndex}`}
              maxLength="1"
              className={`w-12 h-12 text-center text-xl font-bold uppercase focus:bg-yellow-100 outline-none 
                ${INITIAL_GRID[rIndex][cIndex] === '' ? 'bg-gray-800 cursor-not-allowed' : 'bg-white'}`}
              disabled={INITIAL_GRID[rIndex][cIndex] === ''}
              value={cell}
              onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
            />
          ))
        )}
      </div>

      <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="font-bold border-b mb-2">Hints:</h2>
        <ul className="list-disc ml-5">
          {HINTS.map((hint, i) => <li key={i}>{hint}</li>)}
        </ul>
      </div>

      <button 
        onClick={checkResult}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition"
      >
        Check Solution
      </button>

      {status && <p className="mt-4 font-semibold text-lg">{status}</p>}
    </div>
  );
}
