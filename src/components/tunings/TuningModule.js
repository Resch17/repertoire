import React, { useEffect, useContext, useState } from 'react';
import { GuitarTuning } from './GuitarTuning';
import { BassTuning } from './BassTuning';
import { ToneContext } from '../tones/ToneProvider';

export const TuningModule = ({ tuning }) => {
  const { getTones } = useContext(ToneContext);
  const [tones, setTones] = useState([]);

  useEffect(() => {
    getTones().then((parsed) => {
      setTones(parsed);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (tones.length > 0) {
    return (
      <>
        <h3>
          {tuning.name} Tuning - {tuning.instrument.name}
        </h3>
        <h4>Click a note to hear the tone!</h4>
        <div className="headstock__container">
          {tuning.instrumentId === 2 ? (
            <BassTuning tuning={tuning} tones={tones} />
          ) : (
            <GuitarTuning tuning={tuning} tones={tones} />
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
};
