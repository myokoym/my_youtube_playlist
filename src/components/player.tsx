import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube'

type Props = {
  timestamps: Array<Timestamp>,
}

export type Timestamp = {
  videoId: string,
  start: number,
  end: number,
}

const Player: React.FC<Props> = ({ timestamps }) => {
  let index = 0
  let nextIndex = index
  let current = timestamps[index]
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    console.log("onReady: " + index)
    //event.target.playVideo()
  }
  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    console.log("onStateChange", event.data)
    //switch (event.data) {
    //  case -1:
    //    event.target.playVideo()
    //}
  }
  const onPlayerEnd: YouTubeProps['onEnd'] = (event) => {
    console.log("onEnd", current.end)
    // なぜかonEndが2回呼ばれるので、2回目はcurrentを更新しない
    if (index === nextIndex) {
      if (timestamps.length > index + 1) {
        index++
      } else {
        index = 0
      }
      current = timestamps[index]
    } else {
      nextIndex = index
    }
    event.target.loadVideoById({
      videoId: current.videoId,
      startSeconds: current.start,
      endSeconds: current.end,
    })
  }
  //const reset2 = () => {
  //  console.log("reset")
  //}

  const opts: YouTubeProps['opts'] = {
    height: '360',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: current?.start,
      end: current?.end,
    },
  };
  return (
    <div>
      <YouTube
        videoId={current?.videoId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
        onEnd={onPlayerEnd}
      />
    </div>
  );
}

export default Player;
