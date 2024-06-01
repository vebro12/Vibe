import React, { useState } from 'react';
import Logo from '../../img/logo.png'; // Ensure the path is correct
import { UilSearch } from '@iconscout/react-unicons';
import './LogoSearch.css'; // Ensure the path is correct
import { Link} from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const LogoSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = async () => {
    try {
   
      const response = await axios.get(`http://localhost:5000/search/${searchQuery}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        alert("User available!");
    
      } else {
        alert("User not available!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching for the user.");
    }
  };

  return (
    <div className="LogoSearch">
      <Link to="/home"> {/* Adjust the path as needed */}
        <img src={Logo} alt="" />
      </Link>

      <div className="Search">
        <input
          type="text"
          placeholder="# Explore"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <div className="s-icon" onClick={handleSearchButtonClick}>
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
