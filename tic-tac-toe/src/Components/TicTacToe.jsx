import React from 'react'
import "./TicTacToe.css"
import StarWins from './StarWins'

import dot from "../assets/Ellipse 2590.png"
import line from "../assets/misc-line.png"
import slot from "../assets/Slot background.png"
import star from "../assets/star-icon.png"
import planet from "../assets/planet-icon.png"
import hollow from "../assets/Hollow.png"
import restart from "../assets/restart-icon.png"
import hollowB from "../assets/Hollow-bg.png"



function TicTacToe() {

    const [occupied, setOccupied] = React.useState([false, false, false, false, false, false, false, false, false]);
    const [matchesPlanetWon, setPlanetWonMatches] = React.useState(0);
    const [matchesStarWon, setStarWonMatches] = React.useState(0);
    const [totalMatches, setTotalMatches] = React.useState(0);
    const [turn, setTurn] = React.useState(0);
    const [srcImagePath, setSrcImagePath] = React.useState(["", "", "", "", "", "", "", "", ""]);
    const [starWon, setStarWon] = React.useState(false);
    const [planetWon, setPlanetWon] = React.useState(false);
    const [turnsPlayed, setTurnsPlayed] = React.useState(0);


    function changeTurn(turn) {
        setTurn(1 - turn);
    }

    function imageClicked(index) {
        if (!starWon && !planetWon) {
            console.log("clicked");

            if (!occupied[index]) {

                setTurnsPlayed(turnsPlayed + 1);

                const newOccupied = [...occupied];
                newOccupied[index] = true;

                const newSrcImagePath = [...srcImagePath];
                newSrcImagePath[index] = turn === 0 ? "0" : "1";

                setOccupied(newOccupied);
                setSrcImagePath(newSrcImagePath);
                // isWon(srcImagePath, turn);
                changeTurn(turn);
            }
        }
    }

    React.useEffect(() => {
        isWon(srcImagePath, turn);
    }, [srcImagePath, turn]);

    React.useEffect(() => {
        // Update totalMatches and matchesWon after a winner is determined
        if (starWon || planetWon) {
            setTotalMatches((prevTotalMatches) => prevTotalMatches + 1);
            setStarWonMatches((prevMatchesStarWon) => (starWon ? prevMatchesStarWon + 1 : prevMatchesStarWon));
            setPlanetWonMatches((prevMatchesPlanetWon) => (planetWon ? prevMatchesPlanetWon + 1 : prevMatchesPlanetWon));
        }
    }, [starWon, planetWon]);

    function isWon(newSrcImagePath, turn) {
        var who = "";
        if (
            ((newSrcImagePath[0] === newSrcImagePath[1] && newSrcImagePath[1] === newSrcImagePath[2]) && newSrcImagePath[0] !== "")
            || ((newSrcImagePath[3] === newSrcImagePath[4] && newSrcImagePath[4] === newSrcImagePath[5]) && newSrcImagePath[3] !== "")
            || ((newSrcImagePath[6] === newSrcImagePath[7] && newSrcImagePath[7] === newSrcImagePath[8]) && newSrcImagePath[6] !== "")
            || ((newSrcImagePath[0] === newSrcImagePath[3] && newSrcImagePath[3] === newSrcImagePath[6]) && newSrcImagePath[0] !== "")
            || ((newSrcImagePath[1] === newSrcImagePath[4] && newSrcImagePath[4] === newSrcImagePath[7]) && newSrcImagePath[1] !== "")
            || ((newSrcImagePath[2] === newSrcImagePath[5] && newSrcImagePath[5] === newSrcImagePath[8]) && newSrcImagePath[2] !== "")
            || ((newSrcImagePath[0] === newSrcImagePath[4] && newSrcImagePath[4] === newSrcImagePath[8]) && newSrcImagePath[0] !== "")
            || ((newSrcImagePath[2] === newSrcImagePath[4] && newSrcImagePath[4] === newSrcImagePath[6]) && newSrcImagePath[2] !== "")
        ) {
            setTurn(2)
            if (turn === 0) {
                setStarWon(true);
                who = "star";
                // setStarWonMatches(matchesStarWon + 1);
                // reverse since turn will update before executing useEffect
            } if (turn === 1) {
                setPlanetWon(true);
                who = "planet";
                // setPlanetWonMatches(matchesPlanetWon + 1);
            }
            // setTotalMatches(totalMatches + 1);
            console.log(who + " won");
        } else {
            console.log("not yet");
        }

    }

    const handleRestart = () => {
        // Add logic to reset the game state
        setOccupied([false, false, false, false, false, false, false, false, false]);
        setTurn(0);
        setTurnsPlayed(0);
        setSrcImagePath(["", "", "", "", "", "", "", "", ""]);
        setStarWon(false);
        setPlanetWon(false);
        setPlanetWonMatches(0);
        setStarWonMatches(0);
        setTotalMatches(0);
    };

    const handleNextRound = () => {
        setOccupied([false, false, false, false, false, false, false, false, false]);
        setTurn(0);
        setTurnsPlayed(0);
        setSrcImagePath(["", "", "", "", "", "", "", "", ""]);
        setStarWon(false);
        setPlanetWon(false);
        console.log("Next round clicked");
    };


    return (
        <>
            {/* background box */}
            <div className='container'>
                <img src={dot} className='dot-img d1'></img>
                <img src={dot} className='dot-img d2'></img>
                <img src={dot} className='dot-img d3'></img>
                <img src={dot} className='dot-img d4'></img>
                {/* <img src={line} className='line-img l1'></img>
                <img src={line} className='line-img l2'></img>
                <img src={line} className='line-img l3'></img>
                <img src={line} className='line-img l4'></img> */}

                <div className='row bg-row1'>
                    <div className='box box1'></div>
                    <div className='box box2'></div>
                    <div className='box box3'></div>
                </div>
                <div className='row bg-row2'>
                    <div className='box box4'></div>
                    <div className='box box5'></div>
                    <div className='box box6'></div>
                </div>
                <div className='row bg-row3'>
                    <div className='box box7'></div>
                    <div className='box box8'></div>
                    <div className='box box9'></div>
                </div>

                <div className='main-board'>
                    <div className='rows row1'>
                        <div className='boxM boxM1'>
                            <img className='slot slot1' src={slot} onClick={() => imageClicked(0)}></img>
                            {occupied[0] && <img src={srcImagePath[0] === "0" ? planet : star} className='icon'></img>}

                        </div>
                        <div className='boxM boxM2'>
                            <img className='slot' src={slot} onClick={() => imageClicked(1)}></img>
                            {occupied[1] && <img src={srcImagePath[1] === "0" ? planet : star} className='icon'  ></img>}
                        </div>
                        <div className='boxM boxM3'>
                            <img className='slot slot3' src={slot} onClick={() => imageClicked(2)}></img>
                            {occupied[2] && <img src={srcImagePath[2] === "0" ? planet : star} className='icon' ></img>}
                        </div>
                    </div>
                    <div className='rows row2'>
                        <div className='boxM boxM4'>
                            <img className='slot slot4' src={slot} onClick={() => imageClicked(3)}></img>
                            {occupied[3] && <img src={srcImagePath[3] === "0" ? planet : star} className='icon' ></img>}
                        </div>
                        <div className='boxM boxM5'>
                            <img className='slot' src={slot} onClick={() => imageClicked(4)}></img>
                            {occupied[4] && <img src={srcImagePath[4] === "0" ? planet : star} className='icon' ></img>}
                        </div>
                        <div className='boxM boxM6'>
                            <img className='slot' src={slot} onClick={() => imageClicked(5)}></img>
                            {occupied[5] && <img src={srcImagePath[5] === "0" ? planet : star} className='icon' ></img>}
                        </div>
                    </div>
                    <div className='rows row3'>
                        <div className='boxM boxM7'>
                            <img className='slot slot7' src={slot} onClick={() => imageClicked(6)}></img>
                            {occupied[6] && <img src={srcImagePath[6] === "0" ? planet : star} className='icon'></img>}
                        </div>
                        <div className='boxM boxM8'>
                            <img className='slot' src={slot} onClick={() => imageClicked(7)}></img>
                            {occupied[7] && <img src={srcImagePath[7] === "0" ? planet : star} className='icon' ></img>}

                        </div>
                        <div className='boxM boxM9'>
                            <img className='slot slot9' src={slot} onClick={() => imageClicked(8)}></img>
                            {occupied[8] && <img src={srcImagePath[8] === "0" ? planet : star} className='icon' ></img>}
                        </div>
                    </div>
                </div>
            </div>

            {starWon && <StarWins name="Star Wins" onRestart={handleRestart} onNextRound={handleNextRound} />}
            {planetWon && <StarWins name="Planet Wins" onRestart={handleRestart} onNextRound={handleNextRound} />}
            {turnsPlayed === 9 && !starWon && !planetWon && <StarWins name="DRAW" onRestart={handleRestart} onNextRound={handleNextRound} />}


            <div className='whose-turn'>
                <div className='turn-image'>
                    <div className='bg-box'></div>
                    <img src={hollow} className='hollow'></img>
                    {!turn && <img src={planet} className='whose-turn-icon-star'></img>}

                    <div className='counter'>
                        <p className='match-won'>{matchesPlanetWon}</p>
                        <p className='slash'>/</p>
                        <p className='total-matches'>{totalMatches}</p>
                    </div>
                </div>
                <div className='restart'>
                    <img src={restart} className='restart-icon'></img>
                    {/* <p className='vs'>V/S</p> */}
                </div>
                <div className='turn-image'>
                    <div className='bg-box'></div>
                    <img src={hollowB} className='hollow'></img>
                    {turn == 1 && <img src={star} className='whose-turn-icon-star'></img>}
                    <div className='counter'>
                        <p className='match-won'>{matchesStarWon}</p>
                        <p className='slash'>/</p>
                        <p className='total-matches'>{totalMatches}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicTacToe