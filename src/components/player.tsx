import React from 'react';

type Props = {
  videoId: String
}

const Player: React.FC<Props> = ({ videoId }) => {
  return (
    <iframe id="ytplayer" width="640" height="360"
      src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}
    ></iframe>
  );
}

export default Player;
