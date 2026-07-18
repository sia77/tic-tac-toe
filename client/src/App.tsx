import { useEffect } from 'react';
import './App.css'
import { Board } from './components/board';
import { initGA, logPageView } from './utils/google/analytics';

function App() {
  
  useEffect(()=>{
    initGA();
  },[]);

  useEffect(()=>{
    const path = window.location.pathname + window.location.search;
    logPageView(path )
  },[location]);

  return (
    <>
      <Board gridSize={5}></Board>
    </>
  )
}

export default App
