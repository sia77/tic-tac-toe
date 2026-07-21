import { useEffect, useState } from 'react';
import './App.css'
import { Board } from './components/board';
import { initGA, logPageView } from './utils/google/analytics';
import { ResetButton } from './components/ResetButton';
import { ButtonGroup } from './components/ButtonGroup';

function App() {
  
  useEffect(()=>{
    initGA();
  },[]);

  useEffect(()=>{
    const path = window.location.pathname + window.location.search;
    logPageView(path )
  },[location]);

  const [gridSize, setGridSize] = useState<number>(3);

  const resetBoard = () => {

  }

  return (
    <>
      <div className="w-50 mx-auto">
        <div className='flex justify-between my-2'>
          <ButtonGroup gridSize = {gridSize} />
          <ResetButton onClick = {resetBoard} />
        </div>
      </div>

      
      <Board gridSize={gridSize}></Board>
    </>
  )
}

export default App
