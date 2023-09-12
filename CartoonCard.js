import React from 'react';
import './CartoonCard.css';

const CharacterCard = ({ character, onClick }) => {
  const handleCardClick = () => {
    onClick(character);
  };
  return (
    <div className='character-card' onClick={handleCardClick}>
      <img className="character-image" src={character.image} alt={character.name} />
      <p>{character.name}</p>
      <p className="character-info">Species: {character.species}</p>
      <p className="character-info">Status: {character.status}</p>
    </div>
  );
};

export default CharacterCard;
