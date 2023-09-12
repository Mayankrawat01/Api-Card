

import React from 'react';
import './CharacterDetails.css'
const CharacterDetailPage = ({character, onClose}) => {
  const handleBackClick = () => {
    onClose();
  };
  
  return (
    <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>
       
      </span>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Name: {character.name}</p>
<p>Species: {character.species}</p>
<p>Status: {character.status}</p>
<p>Location: {character.location.name}</p>
<button onClick={handleBackClick} className="back-button">
          Back
        </button>
    </div>
  </div>
 
  );
};

export default CharacterDetailPage;

