import React from 'react';
import BlockList from './BlockList/BlockList';
import LatestBlock from './LatestBlock';
import logo from '../assets/logo.svg';
import '../assets/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <LatestBlock />
      <BlockList />
    </div>
  );
}
export default App;
