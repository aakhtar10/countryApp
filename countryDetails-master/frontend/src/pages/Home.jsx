import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Search from "../components/Search";
import CountryDetails from "../components/CountryDetails";
import { Link } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [history, setHistory] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://countryapp-0tlc.onrender.com/api/history", {
          headers: { "x-auth-token": token },
        });
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleSearch = async (currencyCode) => {
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://countryapp-0tlc.onrender.com/api/countries/${currencyCode}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      setCountries(response.data);

      await axios.post(
        "https://countryapp-0tlc.onrender.com/api/history",
        { search: currencyCode },
        { headers: { "x-auth-token": token } }
      );
      setHistory((prevHistory) =>
        [
          currencyCode,
          ...prevHistory.filter((search) => search !== currencyCode),
        ].slice(0, 5)
      );
    } catch (error) {
      console.error("Error searching for countries", error);
    }
  };

  const handleFavorite = async (country) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://countryapp-0tlc.onrender.com/api/favorites",
        country,
        {
          headers: { "x-auth-token": token },
        }
      );
      console.log("Favorite added", response.data);
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };
  

  return (
    <div>
      <Search onSearch={handleSearch} />
      {history.length > 0 && (
        <div>
          <h2>Search History</h2>
          <ul>
            {history?.map((search) => (
              <li key={search}>{search}</li>
            ))}
          </ul>
        </div>
      )}
      {countries.length > 0 ? (
        <CountryDetails
          countries={countries}
          onFavorite={handleFavorite}
          favorites={history}
        />
      ) : (
        <p>
          {user ? (
            <div>
              Login First <Link to={"login"}>Login</Link>
            </div>
          ) : (
            `No countries to
          display. Start searching by currency code!`
          )}
        </p>
      )}
    </div>
  );
};

export default Home;
