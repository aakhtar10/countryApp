import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, password);
    
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
      <div>
        Already have account?<Link to={"/login"}>Login here</Link>
      </div>
    </form>
  );
};

export default Register;
