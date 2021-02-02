import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SetlistContext } from './SetlistProvider';
import './Setlist.css';

export const SetlistItem = ({
  song,
  handleDrag,
  handleDrop,
  id,
  ordinal,
  setSetlist,
}) => {
  const history = useHistory();
  const deleteButton = useRef();
  const handle = useRef();

  const { deleteSetlistItem, updateSetlistItem } = useContext(SetlistContext);

  const controlsOn = () => {
    handle.current.classList.remove('opacity-none');
    deleteButton.current.classList.remove('isHidden');
  };

  const controlsOff = () => {
    handle.current.classList.add('opacity-none');
    deleteButton.current.classList.add('isHidden');
  };

  const handleDelete = () => {
    deleteSetlistItem(id).then((setlist) => {
      setlist.forEach((i) => {
        if (i.ordinal > ordinal) {
          i.ordinal = i.ordinal - 1;
          updateSetlistItem(i).then((newSetlist) => {
            setSetlist(newSetlist);
          });
        }
      });
    });
  };

  return (
    <div
      className="setlist-item"
      draggable={true}
      onDragOver={(evt) => evt.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onMouseEnter={controlsOn}
      onMouseLeave={controlsOff}
      id={id}
    >
      <div className="setlist-item__handle opacity-none" ref={handle}>
        <i className="fas fa-grip-lines"></i>
      </div>
      <h1
        onClick={() => {
          history.push(`/songs/detail/${song.id}`);
        }}
      >
        {song.artist.name} - {song.title}
      </h1>
      <div className="setlist-item__delete-button isHidden" ref={deleteButton}>
        <i className="fas fa-trash-alt fa-2x" onClick={handleDelete}></i>
      </div>
    </div>
  );
};
