import React, { useEffect, useContext } from 'react';
import { GuitarTuning } from './GuitarTuning';
import { BassTuning } from './BassTuning';
import { ToneContext } from '../tones/ToneProvider';

export const TuningModule = ({ tuning }) => {
  const { getTones, tones } = useContext(ToneContext);

  useEffect(() => {
    getTones();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


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
};
