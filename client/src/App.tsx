import { useEffect, useState } from 'react';
import './App.css'
import { Board } from './components/board';
import { initGA, logPageView } from './utils/google/analytics';
import { ResetButton } from './components/ResetButton';
import { ButtonGroup } from './components/ButtonGroup';
import type { GridSizes } from './interfaces/gamesInterfaces';
import { useGameService } from './hook/useGameService';
import { LoadingBoard } from './components/loadingBoard';

function App() {  
  
  useEffect(()=>{
    initGA();
  },[]);

  useEffect(()=>{
    const path = window.location.pathname + window.location.search;
    logPageView(path )
  },[location]);

  const [gridSize, setGridSize] = useState<GridSizes>(3);
  const {board, submitMove, gameResult, resetGame, isPending} = useGameService(gridSize);

  const test = true;

  return (
    <>
      <main className="relative max-w-xl mx-auto min-h-112.5 p-4">
        {test && <LoadingBoard isPending = {test} /> }
        
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
      </main>
    </>
  )
}

export default App
