import React from 'react';

export const BassTuning = ({ tuning, tones }) => {
  const tone1 = tones.find((t) => tuning.string1toneId === t.id);
  const tone2 = tones.find((t) => tuning.string2toneId === t.id);
  const tone3 = tones.find((t) => tuning.string3toneId === t.id);
  const tone4 = tones.find((t) => tuning.string4toneId === t.id);

  const toneArray = [tone1, tone2, tone3, tone4];

  const notePlayer = (path) => {
    const audio = new Audio(`${path}`);
    audio.play();
  };

  return (
    <>
      <h1>BASS HEADSTOCK!</h1>
      {toneArray.map((t) => {
        return (
          <h1
            key={t.id}
            onClick={() => {
              if (t.path) {
                notePlayer(t.path);
              }
            }}
          >
            {t?.note}
          </h1>
        );
      })}
    </>
  );
};
