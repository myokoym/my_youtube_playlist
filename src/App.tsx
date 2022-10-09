import React from 'react';
import './App.css';
import Player from "./components/player"

function App() {
  const timestamps = []
  timestamps.push({
    videoId: "-6CMf_gufLI",
    start: 454,
    end: 600,
  })
  timestamps.push({
    videoId: "-6CMf_gufLI",
    start: 2415,
    end: 2670,
  })


  return (
    <div className="App">
      <Player
        timestamps={timestamps}
      ></Player>
    </div>
  );
}

export default App;
