export const WinnerModal = ({winner, resetGame, Square}) => {
    if (winner === null) return null

    const WinnerText = winner === false ? 'empate' : 'Gano';
    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {WinnerText}
                </h2>

                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    {/* para resetiar un juego debemos de setear los estados a sus valores iniciales */}
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}