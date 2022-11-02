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
        onEnd={onPlayerEnd}
      />
    </div>
  );
}

export default Player;
