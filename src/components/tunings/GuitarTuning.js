import React from 'react';

export const GuitarTuning = ({ tuning, tones }) => {
  const tone1 = tones.find((t) => tuning.string1toneId === t.id);
  const tone2 = tones.find((t) => tuning.string2toneId === t.id);
  const tone3 = tones.find((t) => tuning.string3toneId === t.id);
  const tone4 = tones.find((t) => tuning.string4toneId === t.id);
  const tone5 = tones.find((t) => tuning.string5toneId === t.id);
  const tone6 = tones.find((t) => tuning.string6toneId === t.id);

  const toneArrayLeft = [tone3, tone2, tone1];
  const toneArrayRight = [tone4, tone5, tone6];

  const notePlayer = (path) => {
    const audio = new Audio(`${path}`);
    audio.play();
  };

  return (
    <>
      <div className="guitar-headstock">
        <div className="guitar-headstock__notes guitar-headstock__notes-left">
          {toneArrayLeft.map((t) => {
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
        <div className="guitar-headstock__image">
          <img src="/images/guitar-headstock.png" alt="Guitar Tuner" />
        </div>
        <div className="guitar-headstock__notes guitar-headstock__notes-right">
          {toneArrayRight.map((t) => {
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
      </div>
    </>
  );
};
