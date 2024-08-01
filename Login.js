import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import "./Login.css";

const Login = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authService.login(empId, password);
      login(empId);
      if (response.person_status === "Employee") {
        navigate("/dashboard", { state: { empId } });
      } else if (response.person_status === "Lead") {
        navigate("/lead", { state: { empId } });
      } else if (response.person_status === "Manager") {
        navigate("/manager", { state: { empId } });
      }
    } catch (error) {
      setError("Invalid Employee ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image"></div>
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                required
                placeholder="Employee ID"
              />
            </label>
            <label>
              <span className="input-icon">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
