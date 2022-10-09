import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

type Props = {
  timestamps: Array<Timestamp>
}

type Timestamp = {
  videoId: string,
  start: number,
  end: number,
}

const Player: React.FC<Props> = ({ timestamps }) => {
  let index = 0
  let current = timestamps[index]
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }
  const onPlayerEnd: YouTubeProps['onEnd'] = (event) => {
    if (timestamps.length > index + 1) {
      index++
      current = timestamps[index]
      event.target.loadVideoById({
        videoId: current.videoId,
        startSeconds: current.start,
        endSeconds: current.end,
      })
    }
  }

  const opts: YouTubeProps['opts'] = {
    height: '360',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: current.start,
      end: current.end,
    },
  };
  return (
    <YouTube
      videoId={current.videoId}
      opts={opts}
      onReady={onPlayerReady}
      onEnd={onPlayerEnd}
    />
  );
}

export default Player;
