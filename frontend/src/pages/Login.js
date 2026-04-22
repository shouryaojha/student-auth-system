import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-icon">🔐</div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your student account</p>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/">Register Now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;