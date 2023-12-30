import { useState } from 'react'
import './App.css'

import { checkWinner, checkEndGame } from './logic/board'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { Header } from './components/Header'

function App() {
  const [board, setBoard] = useState(() => {
    //Guardamos el localStorage en una variable
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X;
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {

    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <Header functionBtn={resetGame} />
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >{_}</Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square
          isSelected={turn === TURNS.X}
        >
          {TURNS.X}
        </Square>
        <Square
          isSelected={turn === TURNS.O}
        >
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} Square={Square} />

    </main>

  )
}

export default App
