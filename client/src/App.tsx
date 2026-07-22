import { useEffect, useState } from 'react';
import './App.css'
import { Board } from './components/board';
import { initGA, logPageView } from './utils/google/analytics';
import { ResetButton } from './components/ResetButton';
import { ButtonGroup } from './components/ButtonGroup';
import type { gridSizes } from './interfaces/gamesInterfaces';
import { useGameService } from './hook/useGameService';

function App() {

  
  
  useEffect(()=>{
    initGA();
  },[]);

  useEffect(()=>{
    const path = window.location.pathname + window.location.search;
    logPageView(path )
  },[location]);

  const [gridSize, setGridSize] = useState<gridSizes>(3);
  const {board, submitMove, gameResult, resetGame} = useGameService(gridSize);

  return (
    <>
      <div className="w-50 mx-auto">
        <div className='flex justify-between my-2'>
          <ButtonGroup gridSize = {gridSize} onGrideSizeChange = {setGridSize} />
          <ResetButton onClick = {resetGame} />
        </div>
      </div>      
      <Board 
        gridSize={gridSize}
        gameResult = {gameResult}
        board = {board}
        submitMove = {submitMove}></Board>
    </>
  )
}

export default App
