import React, { useState } from 'react';
import './App.css';
import Player, { Timestamp } from "./components/player"
import TextList from "./components/text_list"

function App() {
  let defaultText =
    "https://www.youtube.com/watch?v=0tJkBgH1d5w,,,-ERROR\n" +
    "https://youtu.be/0tJkBgH1d5w,0:10,0:1:0,-ERROR\n" +
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
  const timeParse = (time: string): number => {
    //console.log("time: ", time)
    let second
    if (/^\d+:\d+:\d+$/.test(time)) {
      let times = time.split(":")
      //console.log("times: ", times)
      second = Number(times[0]) * 3600 + Number(times[1]) * 60 + Number(times[2])
    } else if (/^\d+:\d+$/.test(time)) {
      let times = time.split(":")
      //console.log("times: ", times)
      second = Number(times[0]) * 60 + Number(times[1])
    } else {
      second = Number(time)
    }
    //console.log("second", second)
    return second
  }
  const parseText = (): Timestamp[] => {
    let newTimestamps: Timestamp[] = []
    text.split("\n").forEach(line => {
      //if (!/^[^,]+,\d+,\d+/.test(line)) return
      let columns = line.split(",")
      let videoId = columns[0]
      //console.log("videoId: ", videoId)
      let found = /[?&]v=([^&]+)/.exec(videoId)
      //console.log(found)
      if (found) {
        videoId = found[1]
      } else {
        found = /youtu\.be\/([^?&]+)/.exec(videoId)
        if (found) {
          videoId = found[1]
        }
      }
      //console.log("parsed videoId: ", videoId)
      let start = columns[1]
      let startSec = start ? timeParse(start) : 0
      let end = columns[2]
      let endSec = end ? timeParse(end) : undefined
      newTimestamps.push({
        videoId: videoId,
        start: startSec,
        end: endSec,
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
