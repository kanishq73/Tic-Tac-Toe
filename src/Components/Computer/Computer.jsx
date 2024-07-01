import React, { useState, useCallback, useEffect, useRef } from 'react'
import win from '../Audio/win.mp3'
import wrong from '../Audio/wrong.mp3'
import { NavLink } from 'react-router-dom'
import './computer.css'

function Computer() {

    const winAudioRef = useRef(new Audio(win));
    const wrongAudioRef = useRef(new Audio(wrong));

    const [result, setResult] = useState('');
    const [turn, setTurn] = useState('X');
    const [board, setBoard] = useState(Array(9).fill(''));
    const [availIndex, setAvailIndex] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8']);


    const refBoxes = useRef(null);
    useEffect(() => {
        refBoxes.current = document.querySelectorAll('.boxes');
    }, []);

    const prevTurnRef = useRef(null);

    useEffect(() => {
        prevTurnRef.current = turn; // update the ref with the current turn value
    }, [turn]);

    useEffect(() => {
        if (prevTurnRef.current === 'O') { // use the previous turn value here
            makeAIMove();
        }
    }, [availIndex,setAvailIndex,board,setBoard]);

    useEffect(() => {
        const winner = checkWinner(board);

            if (winner === 'X') {
                setResult("Congratulations You Won !!");
                btnDisable();
                winAudioRef.current.play();
            } 
            else if (winner === 'O') {
                setResult("You Lost !!");
                btnDisable();
                wrongAudioRef.current.play();
            }
            else if (winner === 'draw') {
                setResult('Game Tied !!');
                btnDisable();
                wrongAudioRef.current.play();
            }
        
    }, [board,setBoard]);



    const clicked = (e) => {
        const id = e.target.id;
        e.target.innerText = 'X';
        e.target.disabled = true;

        setTurn((prev) => prev = 'O');
        setBoard((prevBoard) => prevBoard.map((val, index) => index === parseInt(id) ? 'X' : val));
        /* we cannot update the states directly */ 
        setAvailIndex((prevAvailIndex) => prevAvailIndex.filter((index) => index !== id));


    };

    const makeAIMove = useCallback( () => {
        
        setTurn((prevturn) => prevturn = 'X');
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            //iterates over all available spaces
            if (availIndex.includes(i.toString())) {
                const newBoard = [...board]; //spread creates a copy of array board
                newBoard[i] = 'O';
                const score = minimax(newBoard, false);//checks possible best-score after plaing 'O' at index i
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;

                }
            }
        }
        if (bestMove != undefined) { //there may be a case that bestMove never initialised

            const button = document.getElementById(bestMove.toString());

            setTimeout(() => {
                button.innerText = 'O';
            }, 100);

            button.disabled = true;
            setBoard((prevBoard) => prevBoard.map((val, index) => index === bestMove ? 'O' : val));
            setAvailIndex((prevAvailIndex) => prevAvailIndex.filter((index) => index !== bestMove.toString()));
        }
    }, [availIndex, setAvailIndex]);


    const minimax = (board, isMaximizing) => {
        //base condition (stops when game ends).
        const winner = checkWinner(board);
        if (winner === 'X') {
            return -10;
        } else if (winner === 'O') {
            return 10;
        } else if (winner === 'draw') {
            return 0;
        }

        // 'O' maximizes the score (so check if it's 'O's turn or 'X's turn.)
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') { //checks available indexs
                    
                    const newBoard = [...board];
                    newBoard[i] = 'O'; //since this is O's turn we place O

            //Similarly as above it checks possible best-score after plaing 'O' at index i
            //setting isMaximizing false because this is 'O' turn and the next turn is gonna be X's turn who minimize the score.
                    const score = minimax(newBoard, false); 
                    
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    const newBoard = [...board];
                    newBoard[i] = 'X'; //since this is X's turn we place X

            //Similarly as above it checks possible best-score after plaing 'X' at index i
            //setting isMaximizing true because this is 'X' turn and the next turn is gonna be O's turn who maximize the score.
                    const score = minimax(newBoard, true);
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
                return board[a];
            }
        }
        if (board.every((val) => val !== '')) {
            return 'draw';
        }
        return null;
    };

    // const btnEnable = () => {
    //     const boxes = refBoxes.current;
    //     for (let i of boxes) {
    //         i.disabled = false;    //setting all button enable
    //         i.innerText = '';     //setting all button-text empty
    //     }
    // }
    const btnDisable = () => {
        const boxes = refBoxes.current;
        for (let i of boxes) {
            i.disabled = true;    //setting all button disabled
        }
    }

    const Reset = () => {
        window.location.reload(); 
        /*
            reseting the states like board and availIndex will cause to re-run 
            the other useEffect functions, which cause an abnormal behavior.
            So, To reset the game here we're reload the entire web page.
        */
    }


    return (
        <>
            <div className='out max-h-screen'>

            <h2 className="title" >{result}</h2>

                <div className='board'>

                    <div className='row1'>
                        <button className='boxes' id='0' onClick={(e) => clicked(e)}></button>
                        <button className='boxes' id='3' onClick={(e) => clicked(e)}></button>
                        <button className='boxes' id='6' onClick={(e) => clicked(e)}></button>
                    </div>

                    <div className='row2'>
                        <button className='boxes' id='1' onClick={(e) => clicked(e)}></button>
                        <button className='boxes' id='4' onClick={(e) => clicked(e)}></button>
                        <button className='boxes' id='7' onClick={(e) => clicked(e)}></button>
                    </div>

                    <div className='row3'>
                        <button className='boxes' id='2' onClick={(e) => clicked(e)}></button>
                        <button className='boxes' id='5' onClick={(e) => clicked(e)}></button>
                        <button className='boxes' id='8' onClick={(e) => clicked(e)}></button>
                    </div>

                </div>

                
                <button className='reset' onClick={Reset} >Restart</button>
                
                
            </div>

        </>
    )
}

export default Computer;
