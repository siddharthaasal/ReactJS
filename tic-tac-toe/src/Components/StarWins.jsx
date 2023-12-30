import React from 'react'
import "./StarWins.css"

function StarWins(props) {
    const handleRestart = () => {
        // Call the restart callback from TicTacToe.jsx
        props.onRestart();
    };

    const handleNextRound = () => {
        // Call the next round callback from TicTacToe.jsx
        props.onNextRound();
    };
    return (

        <>
            <div className='main-box'>
                <p className='heading'>{props.name}</p>
                <div className='info'>
                    <p className='text-nr' onClick={handleNextRound}>Next Round</p>
                    <p className='text-res' onClick={handleRestart}>Restart</p>
                </div>
            </div>
        </>

    )
}

export default StarWins