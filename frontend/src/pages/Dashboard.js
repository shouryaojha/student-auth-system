import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [course, setCourse] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const updateCourse = async () => {
    try {
      await axios.put(
        "https://student-auth-system-sdig.onrender.com/api/update-course",
        { course },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state + localStorage instantly
      const updatedUser = { ...userData, course };
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Course updated");
      setCourse("");
    } catch {
      alert("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put(
        "https://student-auth-system-sdig.onrender.com/api/update-password",
        passwords,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch {
      alert("Error updating password");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Student <span>Dashboard</span></h1>
        <button className="btn-logout" onClick={logout}>⏻ Logout</button>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="card-label">Name</div>
          <div className="card-value">{userData?.name || "—"}</div>
        </div>
        <div className="profile-card">
          <div className="card-label">Email</div>
          <div className="card-value">{userData?.email || "—"}</div>
        </div>
        <div className="profile-card">
          <div className="card-label">Course</div>
          <div className="card-value">{userData?.course || "—"}</div>
        </div>
      </div>

      <div className="section-card">
        <h3>Update Course</h3>
        <div className="input-row">
          <input
            placeholder="Enter new course name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <button className="btn-action" onClick={updateCourse}>Update Course</button>
        </div>
      </div>

      <div className="section-card">
        <h3>Change Password</h3>
        <div className="input-row">
          <input
            placeholder="Old Password"
            type="password"
            value={passwords.oldPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, oldPassword: e.target.value })
            }
          />
          <input
            placeholder="New Password"
            type="password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
          <button className="btn-action" onClick={updatePassword}>Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;