import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { editCard } from '../../actions/board';
import { useDispatch } from 'react-redux';

const Multimedia = ({ cardId, multimedia }) => {
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState('video');
  const dispatch = useDispatch();

  const handleAddMedia = () => {
    if (newMediaUrl !== '') {
      dispatch(
        editCard(cardId, {
          multimedia: [...multimedia, { type: newMediaType, url: newMediaUrl }],
        })
      );
      setNewMediaUrl('');
    }
  };

  return (
    <div>
      <Typography variant='h6'>Multimedia</Typography>
      {multimedia.map(({ type, url }, index) => (
        <a key={index} href={url} target='_blank' rel='noopener noreferrer'>
          dark {type} {index + 1}
        </a>
      ))}
      <div>
        <input
          type='text'
          value={newMediaUrl}
          onChange={(e) => setNewMediaUrl(e.target.value)}
          placeholder='Enter media URL'
        />
        <select value={newMediaType} onChange={(e) => setNewMediaType(e.target.value)}>
          <option value='video'>Video</option>
          <option value='file'>File</option>
          <option value='audio'>Audio</option>
        </select>
        <Button onClick={handleAddMedia}>Add Media</Button>
      </div>
    </div>
  );
};

export default Multimedia;