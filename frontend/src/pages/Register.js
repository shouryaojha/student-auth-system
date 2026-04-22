import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://student-auth-system-sdig.onrender.com/api/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-icon">🎓</div>
        <h2>Create Account</h2>
        <p className="subtitle">Register to access your student portal</p>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" placeholder="Enter your name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create a password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Course</label>
            <input name="course" placeholder="e.g. B.Tech, BCA, MCA" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-primary">Register</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;