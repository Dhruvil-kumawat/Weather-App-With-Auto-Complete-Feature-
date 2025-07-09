import React, { useState } from 'react';
import axios from 'axios';
import './CityAutocomplete.css'; // create this CSS for styling

const CityAutocomplete = ({ onCitySelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');

  const fetchCities = async (query) => {
    if (!query) return;
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: { namePrefix: query, limit: 5 },
      headers: {
        'X-RapidAPI-Key': '0f92e14409msh4a82254760f40bfp1024f8jsnf188dd575bb6',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setSuggestions(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchCities(value);
  };

  const handleSelect = (city) => {
    setInput(city.city);
    setSuggestions([]);
    onCitySelect(city.city);
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((city) => (
            <li key={city.id} onClick={() => handleSelect(city)}>
              {city.city}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
