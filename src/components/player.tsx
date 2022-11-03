import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube'

type Props = {
  timestamps: Array<Timestamp>,
}

export type Timestamp = {
  videoId: string,
  start: number,
  end: number | undefined,
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
    let options: any = {
      videoId: current.videoId,
      startSeconds: current.start,
    }
    if (current.end) {
      options.endSeconds = current.end
    }
    event.target.loadVideoById(options)
  }

  const playerVars = (curr: Timestamp) => {
    let options: any = {
      autoplay: 1,
      start: curr.start,
    }
    if (curr.end) {
      options.end = curr.end
    }
    return options
  }
  const opts: YouTubeProps['opts'] = {
    height: '360',
    width: '640',
    playerVars: playerVars(current),
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
