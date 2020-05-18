import React from 'react';
import BlockList from './BlockList/BlockList';
import LatestBlock from './LatestBlock';
import logo from '../assets/logo.svg';
import '../assets/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Bitcoin Data
      </header>
      <LatestBlock />
      <BlockList />
      <footer className="App-footer">
        Built with React
        <img src={logo} className="App-logo" alt="logo" />
      </footer>
    </div>
  );
}
export default App;
