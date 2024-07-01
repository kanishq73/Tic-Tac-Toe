import React, { useState , useEffect ,useRef} from 'react'
import win from '../Audio/win.mp3'
import wrong from '../Audio/wrong.mp3'
import './Twoplayer.css'

function Twoplayer () {
   
    const [count,setcount]=useState(1);
    const [text, setText]=useState('X');
    const [result, setResult]=useState('');
    const [game_end , setGame_end]=useState(false);
    const [Restart,setRestart] = useState('false');
    const [tie , setTie]=useState('false');
    
    const refBoxes = useRef(null);
/* we cannot directly initialise refBoxes using useRef because useRef is a hook 
that is meant to be used to create a reference to a value that persists across renders, 
but document.querySelectorAll('.boxes') is a DOM query that should be executed 
after the component has mounted. */

    useEffect(() => {
      refBoxes.current = document.querySelectorAll('.boxes');
    }, []);

    const winAudioRef = useRef(new Audio(win));
    const wrongAudioRef = useRef(new Audio(wrong));


    const winPattern = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    useEffect ( ()=>{
        btnEnable();
        setResult('');
        setGame_end(false);
        setcount(1);
        setText('X');
        setTie(false);
    },[Restart] );

    useEffect(() => {
        if(result != ''){
            if (tie===true) {
                wrongAudioRef.current.play();
            }
            else{
                winAudioRef.current.play();
            }
        }
    }, [result,tie]);

    const turn=(e)=>{
        setcount((count)=>count+1);
        e.target.innerText = text;
        setText(text==='X'?'O':'X');
        e.target.disabled = true; //disable the button 

        if(count >= 5 ){ //min 5 moves are req to win player1
            checkwinner();
        } 
        if(count >=9){
            checkTie();
        }
    }

    const btnDisable=()=>{
        const boxes = refBoxes.current ;
        for(let i of boxes){    
            i.disabled=true;    //setting all button disabled
        }
    }
    const btnEnable=()=>{
        const boxes = refBoxes.current ;
        for(let i of boxes){    
            i.disabled=false;    //setting all button enable
            i.innerText='';     //setting all button-text empty
        }
    }

    const checkwinner=()=>{
        const boxes = refBoxes.current ;
        
        for (let pattern of winPattern) {
            let pos1 = boxes[pattern[0]].textContent;
            let pos2 = boxes[pattern[1]].textContent;
            let pos3 = boxes[pattern[2]].textContent;

            if(pos1 != "" && pos2 != "" && pos3 !=""){
                if(pos1 === pos2 && pos2 === pos3 && pos3 ===pos1){
                    setResult("Congratulations "+pos1+" Wins !!");
                    setGame_end(true);
                    btnDisable();
                    break;
                }
            }
        }
        
    }

    const checkTie=()=>{
        setGame_end((prevGameEnd) => {
            if (!prevGameEnd) { //if previous value of game-end is false
              setTie(true);
              setResult('Game Tied !!');
            }
            return true;
          });
    };



  return (
    <>

    <div className='out max-h-screen'>
        <h2 className={ ` title ${game_end? "hidden" : ""}`} >{text}'s Turn</h2>
        <h2 className={ ` title ${game_end? "" : "hidden"}`} >{result}</h2>

        <div className='board'>  

            <div className='row1'>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
            </div>

            <div className='row2'>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
            </div>

            <div className='row3'>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
                <button className='boxes' onClick={(e)=>{turn(e)}}></button>
            </div>

        </div>
        <button className='reset' onClick={()=>setRestart(!Restart)}>Restart</button>

    </div>


    </>
  )
}

export default Twoplayer;
