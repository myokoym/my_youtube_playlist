import React from 'react';

type Props = {
  text: string,
  updateText: (text: string) => void,
}

const TextList: React.FC<Props> = ({ text, updateText }) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
    updateText(ev.target.value)
  };
  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        rows={10}
        cols={20}
      ></textarea>
    </div>
  );
}

export default TextList;
