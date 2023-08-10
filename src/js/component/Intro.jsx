import React from "react";

export const Intro = ({
    playerXName,
    setPlayerXName,
    playerOName,
    setPlayerOName,
    setSelectedSymbol,
    TURNS
}) => {
    return (
        <div className="d-flex flex-column">
            <input
                className="rounded mb-1"
                type="text"
                placeholder="Jugador 1"
                value={playerXName}
                onChange={(e) => setPlayerXName(e.target.value)}
            />
            <input
                className="rounded mb-1"
                type="text"
                placeholder="Jugador 2"
                value={playerOName}
                onChange={(e) => setPlayerOName(e.target.value)}
            />
            <div>
                <button onClick={() => setSelectedSymbol(TURNS.X)}>Seleccionar X</button>
                <button onClick={() => setSelectedSymbol(TURNS.O)}>Seleccionar O</button>
            </div>

        </div>
    );
};