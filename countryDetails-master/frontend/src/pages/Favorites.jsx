import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import CountryCard from "../components/CountryCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/favorites",
          {
            headers: { "x-auth-token": token },
          }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="country-details">
          {favorites.map((fav) => (
            <CountryCard key={fav.countryCode} country={fav} />
          ))}
        </div>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
