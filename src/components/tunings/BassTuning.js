import React from 'react';

export const BassTuning = ({ tuning, tones }) => {
  const tone1 = tones.find((t) => tuning.string1toneId === t.id);
  const tone2 = tones.find((t) => tuning.string2toneId === t.id);
  const tone3 = tones.find((t) => tuning.string3toneId === t.id);
  const tone4 = tones.find((t) => tuning.string4toneId === t.id);

  const toneArray = [tone4, tone3, tone2, tone1];

  const notePlayer = (path) => {
    const audio = new Audio(`${path}`);
    audio.play();
  };

  return (
    <>
      <div className="bass-headstock">
        <div className="bass-notes">
          {toneArray.map((t) => {
            return (
              <h1
                key={t.id}
                className="tuner-note"
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
        </div>
        <div className="bass-image">
          <img src="/images/bass-headstock.png" alt="Bass Tuner" />
        </div>
      </div>
    </>
  );
};
