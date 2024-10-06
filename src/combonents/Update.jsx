import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get(`https://670239e5bd7c8c1ccd3e3bc3.mockapi.io/Characters/${id}`)
      .then(res => {
        setName(res.data.name);
        setImage(res.data.image);
      })
  }, [id]);

  const toSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://670239e5bd7c8c1ccd3e3bc3.mockapi.io/Characters/${id}`, {
      name,
      image,
    })
    .then(response => {
      console.log('Character updated:', response.data);
      navigate('/');  
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Character</h1>

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
              Update Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
