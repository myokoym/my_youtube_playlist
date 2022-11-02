import React, { useState } from 'react';
import './App.css';
import Player, { Timestamp } from "./components/player"
import TextList from "./components/text_list"

function App() {
  let defaultText =
    "eAIPxj9WgeQ,2015,2419,Everything\n" +
    "eAIPxj9WgeQ,2684,3032,366日\n" +
    "eAIPxj9WgeQ,3153,3397,忘れじの言の葉\n" +
    //"eAIPxj9WgeQ,2015,2019\n" +
    //"eAIPxj9WgeQ,2684,2688\n" +
    //"eAIPxj9WgeQ,3153,3157,忘れじの言の葉\n" +
    //"gSAjCYAw4N4,561,,\n" +
    //"gSAjCYAw4N4,1017,,\n" +
    //"gSAjCYAw4N4,3611,,\n" +
    "-dhrp_Kqf5w,769,971,CHAINSAW BLOOD\n"
    //"-6CMf_gufLI,454,600\n" +
    //"-6CMf_gufLI,2415,2670\n" +
  const [text, setText] = useState<string>(defaultText)
  const updateText = (text: string): void => setText(text)
  const parseText = (): Timestamp[] => {
    let newTimestamps: Timestamp[] = []
    text.split("\n").forEach(line => {
      if (!/^[^,]+,\d+,\d+/.test(line)) return
      let columns = line.split(",")
      newTimestamps.push({
        videoId: columns[0],
        start: Number(columns[1]),
        end: Number(columns[2]),
      })
    });
    return newTimestamps
  }
  const [timestamps, setTimestamps] = useState<Timestamp[]>(parseText())
  const updateTimestamps = (): void => {
    setTimestamps(parseText())
  }

  return (
    <div className="App">
      <Player
        timestamps={timestamps}
      ></Player>
      <button onClick={updateTimestamps}>↑更新↑</button>
      <TextList
        text={text}
        updateText={updateText}
      ></TextList>
    </div>
  );
}

export default App;
