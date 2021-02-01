import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../users/UserProvider';
import { TuningContext } from './TuningProvider';
import { TuningModule } from './TuningModule';
import './Tuner.css';

export const Tuner = () => {
  const { getTunings, tunings } = useContext(TuningContext);
  const { activeLinkSet } = useContext(UserContext);
  const instrumentSelect = useRef();

  const [instrument, setInstrument] = useState(1);
  const [selectedTuning, setSelectedTuning] = useState({
    id: 1,
    name: 'Standard',
    instrumentId: 1,
    string1toneId: 1,
    string2toneId: 2,
    string3toneId: 3,
    string4toneId: 4,
    string5toneId: 5,
    string6toneId: 6,
  });

  useEffect(() => {
    getTunings().then(() => {
      setSelectedTuning(tunings.find((t) => t.id === 1));
    });
    activeLinkSet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const instrumentSelection = () => {
    instrumentSelect.current.checked ? setInstrument(2) : setInstrument(1);
  };

  // instrumentSelection code
  useEffect(() => {
    if (instrument === 2) {
      setSelectedTuning(tunings.find((t) => t.id === 3));
    } else {
      setSelectedTuning(tunings.find((t) => t.id === 1));
    }
  }, [instrument]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectTuning = (evt) => {
    const tuningId = parseInt(evt.target.value);
    setSelectedTuning(tunings.find((t) => t.id === tuningId));
  };

  return (
    <div className="tuner-container">
      <div className="tuner__instrument-select">
        <h2>Guitar</h2>
        <label className="switch">
          <input
            type="checkbox"
            ref={instrumentSelect}
            onClick={instrumentSelection}
          />
          <span className="slider round"></span>
        </label>
        <h2>Bass</h2>
      </div>
      <div className="tuner__tuning-select">
        <label>Tuning</label>
        <select onChange={handleSelectTuning} value={selectedTuning.id}>
          {tunings
            .filter((t) => t.instrumentId === instrument)
            .map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
        </select>
      </div>
      <div className="tuner">
        <TuningModule tuning={selectedTuning} />
      </div>
    </div>
  );
};
