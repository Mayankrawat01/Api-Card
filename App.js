// import React, { useEffect, useState } from 'react';
// import './App.css';
// import CharacterCard from './component/CartoonCard';
// import CharacterDetailPage from './component/CharacterDetails';

// function App() {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
//   const [selectedCharacter, setSelectedCharacter] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//   useEffect(() => {
//     const fetchCharacters = async () => {
//       try {
//         const response = await fetch('https://rickandmortyapi.com/api/character');
//         const data = await response.json();
//         setCharacters(data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchCharacters();
//   }, []);

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 1000);
//     return () => {
//       clearTimeout(debounceTimer);
//     };
//   }, [searchQuery]);

//   const filteredCharacters = characters.filter((character) =>
//     character.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//   );

//   const handleCharacterClick = (character) => {
//     setSelectedCharacter(character);
//     setShowModal(true);
//   };

//   const handleCloseCharacterDetails = () => {
//     setSelectedCharacter(null);
//     setShowModal(false);

//   };

//   return (
//     <div className="App">
//       <h1>Rick and Morty Character Cards</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by character name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>
//       <div className="card-container">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           filteredCharacters.map((character) => (
//             <CharacterCard
//               key={character.id}
//               character={character}
//               onClick={() => handleCharacterClick(character)}
//             />
//           ))
//         )}
//       </div>
//       {selectedCharacter && (
//         <CharacterDetailPage
//           character={selectedCharacter}
//           onClose={handleCloseCharacterDetails}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import './App.css';
import CharacterCard from './component/CartoonCard';
import CharacterDetailPage from './component/CharacterDetails';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(4); // Number of cards to display initially and incrementally

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    
  );
  console.log(filteredCharacters);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const handleCloseCharacterDetails = () => {
    setSelectedCharacter(null);
    setShowModal(false);
  };

  // Function to load more cards when reaching the bottom of the page
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     setCardsToShow(cardsToShow + 4); // Increase the number of cards to show by 4
  //   }
  // };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    ) {
      setCardsToShow(cardsToShow + 4); // Increase the number of cards to show by 4
    }
  };
  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cardsToShow]);

  return (
    <div className="App">
      <h1>Rick and Morty Character Cards</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by character name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="card-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredCharacters.slice(0, cardsToShow).map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCharacterClick(character)}
            />
          ))
        )}
      </div>
      {selectedCharacter && (
        <CharacterDetailPage
          character={selectedCharacter}
          onClose={handleCloseCharacterDetails}
        />
      )}
    </div>
  );
}

export default App;

