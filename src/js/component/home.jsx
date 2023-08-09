import React, {useState} from "react";

const TURNS = {
	O: 'o',
	X: 'x'
};





const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? 'is-selected' : ''} `;
	const handleClick = () => {
		updateBoard(index);
	}
	return (
		<div onClick={handleClick} className={className}>
			{children}
		</div>
	)
}

const winnerSets = [
	[0, 1, 2],
	[3, 4, 5], 
	[6, 7, 8], 
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

//create your first component
const Home = () => {
	const [board, setBoard] = useState(Array(9).fill(null));

	const [turn, setTurn] = useState(TURNS.X);

	const [winner, setWinner] = useState(null); // si winner es = null "aún no hay ganador" | si es = a false "es un empate"

	const checkWinner = (boardToCheck) => {
		for (const set of winnerSets){
			const [a, b, c] = set;
			if(boardToCheck[a] &&
				boardToCheck[a] == boardToCheck[b] &&
				boardToCheck[a] == boardToCheck[c]){
					return boardToCheck[a];
				}
		}
		//en caso de que no haya ganador
		return null;
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);
	}

	const checkEndGame = (newBoard) => {
		return newBoard.every((square) => square != null );
	}


	const updateBoard = (index) => {

		if(board[index] || winner) return; // si ya hay un turno en el div, retornar
		const newBoard = [...board];
		newBoard[index] = turn;
		console.log(newBoard);
		setBoard(newBoard);
		const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		//verificar si hay ganador
		const newWinner = checkWinner(newBoard);
		if(newWinner){
			setWinner(newWinner);
		} else if(checkEndGame(newBoard)){
			setWinner(false);
		}
	}

	return (
		<>
			<main className="board">
				<h1>Tic tac toe</h1>
				<button onClick={resetGame}>Resetear el juego</button>
				<section className="game">
					{
						board.map((c, index) => {
							return (
								<Square
									key={index}
									index={index}
									updateBoard={updateBoard}
								>
									{board[index]}
								</Square>

							)
						})
					}
				</section>
				<section className="turn">
					<Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
					<Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
				</section>
				{
					winner != null && (
						<section className="winner">
							<div className="text">
								<h2>
									{
										winner == false ? 'Empate' : 'Ganó: ' + winner
									}
								</h2>
								<header className="win">
									{winner && <Square>{winner}</Square>}
								</header>
								<footer>
									<button onClick={resetGame}>Empezar de nuevo</button>
								</footer>
							</div>
						</section>
					)
				}
			</main>
		</>
	);
};

export default Home;
