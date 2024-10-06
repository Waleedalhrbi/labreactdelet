import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddCharacters() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const toSubmit = (e) => {
    e.preventDefault();

     
    axios.post('https://670239e5bd7c8c1ccd3e3bc3.mockapi.io/Characters', {
      name,
      gender,
      image,
    })
    .then(response => {
      console.log('Character added:', response.data);
      navigate('/');  
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Character</h1>

        <form onSubmit={toSubmit} className="space-y-4">
      
          <div className="form-control">
            <label className="label">
              <span className="label-text">Character Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

        
          <div className="form-control">
            <label className="label">
              <span className="label-text">Character Gender</span>
            </label>
            <select
              className="select select-bordered"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Character Image (URL)</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          
          <div className="form-control">
            <button type="submit" className="btn btn-success w-full">
              Add Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCharacters;
