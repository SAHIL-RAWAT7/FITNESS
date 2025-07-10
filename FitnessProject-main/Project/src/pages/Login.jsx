import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [redirectPath, setRedirectPath] = useState(null); // ✅ use path instead of boolean

  const handleLogin = () => {
    if (username === "admin123" && password === "adminpass" && role === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("username", username);

      toast.success("Admin login successful! 👑");

      setTimeout(() => {
        setRedirectPath("/admin-dashboard");
      }, 1200); // delay to show toast
    } else if (username === "user123" && password === "userpass" && role === "user") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");
      localStorage.setItem("username", username);

      toast.success("User login successful! 💪");

      setTimeout(() => {
        setRedirectPath("/user-dashboard");
      }, 1200);
    } else {
      toast.error("Invalid credentials ❌");
      setError("Invalid credentials");
    }
  };

  // ✅ If redirectPath is set, navigate
  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-blue-100 to-pink-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4149/4149645.png"
          alt="logo"
          className="mx-auto mb-2 w-20 h-20 animate-bounce"
        />
        <h1 className="text-3xl font-bold text-gray-800 animate-pulse">Fitness Forge</h1>
        <p className="text-sm text-yellow-500 mb-6">✨ Elite fitness awaits</p>

        <div className="text-left mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="text-left mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex justify-center gap-6 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl font-bold flex justify-center items-center gap-2 animate-pulse transition duration-300 transform hover:scale-105"
        >
          Enter Forge <span>👑</span>
        </button>
      </div>
    </div>
  );
}
