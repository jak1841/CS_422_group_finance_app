import './App.css';
import React, { useState } from 'react';
import {Home} from './Home.js';
import {History} from './History.js';
import {Insights_screen} from './Insights.js';


function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  // Define a function to switch between screens
  const switchScreen = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div>

      {activeScreen === 'insights' && <Insights_screen />}
      {activeScreen === 'home' && <Home switchScreen={switchScreen} />}
      {activeScreen === 'history' && <History />}

      <button id="home_button" onClick={() => switchScreen('insights')}>insights</button>
      <button onClick={() => switchScreen('home')}>home</button>
      <button onClick={() => switchScreen('history')}>history</button>
      
    </div>
  );
}

export default App;
