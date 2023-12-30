export const Header = ({ functionBtn }) => {
    const handleClick = () => {
        functionBtn()
    }
    return (
        <>
            <h1>{'Tic tac toe'}</h1>
            <button onClick={handleClick}>{'Reset del juego'}</button>
        </>
    )
}