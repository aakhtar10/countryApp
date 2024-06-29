import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>Countries of the World</h1>
     <div> {user ? (
        <>
          <p>Welcome, {user.username}</p>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      </div>
    </header>
  );
};

export default Header;
