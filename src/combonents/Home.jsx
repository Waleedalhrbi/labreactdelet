import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [search, setsearch] = useState('');
  const [characterToDelet, setcharacterToDelet] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('https://670239e5bd7c8c1ccd3e3bc3.mockapi.io/Characters')
      .then(res => {
        setCharacters(res.data);
      });
  }, []);

  const Delete = (id) => {
    setcharacterToDelet(id); 
  };

  const confirmD = () => {
    axios.delete(`https://670239e5bd7c8c1ccd3e3bc3.mockapi.io/Characters/${characterToDelet}`)
      .then(() => {
        setCharacters(characters.filter(character => character.id !== characterToDelet));
        setcharacterToDelet(null);  
      })
      .catch(error => {
        console.error('Error deleting character:', error);
      });
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Characters</h1>

      
      <div className="mb-6 text-center">
        <button className="btn btn-success" onClick={() => navigate('/addCha')}>
          Add New Character
        </button>
      </div>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search characters..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div key={character.id} className="card w-72 bg-base-100 shadow-xl">
              <figure>
                <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{character.name}</h2>
                <div className="card-actions justify-center space-x-2">
                  <button
                    className="btn btn-error"
                    onClick={() => Delete(character.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => navigate(`/update/${character.id}`)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-bold">Oops!!</p>
        )}
      </div>

      {characterToDelet && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Do you want to delete this character?</h3>
            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmD}>Yes</button>
              <button className="btn" onClick={() => setcharacterToDelet(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
