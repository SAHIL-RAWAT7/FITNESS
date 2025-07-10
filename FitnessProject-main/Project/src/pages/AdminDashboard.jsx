import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(null);
  const [username, setUsername] = useState("admin");
  const [myExercises, setMyExercises] = useState([]);
  const [activeTab, setActiveTab] = useState("Workout Manager");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("username");
    setUsername(name || "admin");
    if (!role || role !== "admin") navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const exerciseLibrary = [
    {
      name: "Push-ups",
      description: "Classic bodyweight chest exercise",
      muscles: ["Chest", "Triceps", "Shoulders"],
      equipment: "Bodyweight",
    },
    {
    name: "Plank",
    description: "Core stability exercise for abs and spine",
    muscles: ["Abs", "Lower Back", "Shoulders"],
    equipment: "Bodyweight",
  },
  {
    name: "Shoulder Press",
    description: "Overhead pressing movement for deltoids",
    muscles: ["Shoulders", "Triceps"],
    equipment: "Dumbbells",
  },
  {
    name: "Bicep Curls",
    description: "Isolation exercise for building biceps",
    muscles: ["Biceps"],
    equipment: "Dumbbells",
  },
    {
      name: "Bench Press",
      description: "Primary chest building exercise",
      muscles: ["Chest", "Triceps", "Shoulders"],
      equipment: "Barbell",
    },
  ];

  const addToWorkout = (exercise) => {
    setMyExercises([...myExercises, exercise]);
    setShowModal(null);
  };

  const deleteExercise = (index) => {
    const updated = [...myExercises];
    updated.splice(index, 1);
    setMyExercises(updated);
  };

  const tabs = [
    "Workout Manager",
    "User Management",
    "Analytics",
    "Activity Logs",
    "Templates",
    "System Settings",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-100 to-pink-100 p-4">
      {/* HEADER */}
      {/* HEADER */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
  <div className="flex items-center gap-4">
    <img src="https://cdn-icons-png.flaticon.com/512/4149/4149645.png" alt="logo" className="w-16 h-16" />
    <div>
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 animate-pulse">Fitness Forge</h1>
      <p className="text-xs sm:text-sm text-yellow-600">Elite fitness planning & transformation</p>
    </div>
  </div>
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
    <div className="bg-pink-100 text-black px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-between">
      <span className="text-xl">👤</span>
      <span className="font-semibold truncate">{username}</span>
    </div>
    <button
      onClick={handleLogout}
      className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 w-full sm:w-auto"
    >
      ⎋ Logout
    </button>
  </div>
</div>


      {/* Admin Tabs */}
      <div className="bg-white rounded-3xl shadow p-6 mb-10 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center ">
          {tabs.map((tab, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 rounded-xl cursor-pointer transition font-medium animate-pulse${
                activeTab === tab
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="mt-6">
          {activeTab === "Workout Manager" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 mt-4">
                <StatCard title="Exercises" icon="🎯" color="text-indigo-600" count={myExercises.length} />
                <StatCard title="Sets" icon="📈" color="text-purple-600" count={myExercises.length * 3 || 0} />
                <StatCard title="Duration" icon="⏱️" color="text-green-600" count={`${myExercises.length * 5 || 0}m`} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input type="text" className="flex-1 px-4 py-2 rounded-xl shadow" placeholder="My Workout Plan" />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-xl font-bold">
                  💾 Save Name
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                <ModalBtn label="➕ Add Exercise" onClick={() => setShowModal("add")} />
                <ModalBtn label="📚 Library" onClick={() => setShowModal("library")} />
                <ModalBtn label="⚖️ BMI Calc" onClick={() => setShowModal("bmi")} />
                <ModalBtn label="🎯 Goals" onClick={() => setShowModal("goals")} />
                <ModalBtn label="⬇️ Export" onClick={() => setShowModal("export")} />
              </div>

              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl animate-bounce">🏋️‍♂️</span>
                  <h2 className="text-2xl font-bold text-gray-800 animate-pulse">My Workout Plan</h2>
                </div>
                {myExercises.length === 0 ? (
                  <div className="text-center text-gray-600 py-10">No exercises yet. Use the Library to add some.</div>
                ) : (
                  <ul className="space-y-4">
                    {myExercises.map((ex, idx) => (
                      <li key={idx} className="bg-gray-50 p-6 rounded-xl shadow border relative">
                        <h4 className="font-bold text-lg">{ex.name}</h4>
                        <p className="text-sm text-gray-600">{ex.description}</p>
                        <p className="text-sm"><strong>Muscles:</strong> {ex.muscles.join(", ")}</p>
                        <p className="text-sm"><strong>Equipment:</strong> {ex.equipment}</p>
                        <button onClick={() => deleteExercise(idx)} className="absolute top-2 right-2 text-red-600 text-sm">❌</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {activeTab === "User Management" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">User Management</h2>
              {[
                { name: "Alice Johnson", email: "alice@example.com", joined: "2025-05-10", workouts: 12, status: "Active" },
                { name: "Bob Williams", email: "bob@example.com", joined: "2025-04-22", workouts: 3, status: "Inactive" },
                { name: "Charlie Brown", email: "charlie@example.com", joined: "2025-03-15", workouts: 25, status: "Banned" },
              ].map((u, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 shadow">
                  <div className="font-bold">{u.name}</div>
                  <div className="text-sm text-gray-600">{u.email}</div>
                  <div className="text-sm text-gray-500">Joined: {u.joined}</div>
                  <div className="text-sm">Workouts: {u.workouts}</div>
                  <div className="text-sm text-green-600 font-semibold">Status: {u.status}</div>
                </div>
              ))}
            </div>
          )}

          {["Analytics", "Activity Logs", "Templates", "System Settings"].includes(activeTab) && (
            <div className="text-center text-gray-600 py-20">
           These system would be implemented here.
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500"
            >
              ❌
            </button>

            {showModal === "library" && (
              <>
                <h3 className="text-2xl font-bold mb-4">Exercise Library</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exerciseLibrary.map((ex, index) => (
                    <div key={index} className="border p-4 rounded-xl shadow">
                      <h4 className="font-bold text-lg">{ex.name}</h4>
                      <p className="text-sm text-gray-600">{ex.description}</p>
                      <p className="text-sm mt-1"><strong>Muscles:</strong> {ex.muscles.join(", ")}</p>
                      <p className="text-sm"><strong>Equipment:</strong> {ex.equipment}</p>
                      <button
                        onClick={() => addToWorkout(ex)}
                        className="mt-2 bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                      >
                        ➕ Add to Workout
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {showModal === "add" && (
              <>
                <h3 className="text-xl font-bold mb-4">Add Exercise</h3>
                <select className="w-full border px-3 py-2 rounded-xl mb-3">
                  <option>Select Muscle Group</option>
                  <option>Chest</option>
                  <option>Back</option>
                  <option>Legs</option>
                  <option>Arms</option>
                  <option>Abs</option>
                </select>
                <button className="bg-blue-500 text-white w-full py-2 rounded-xl font-bold">➕ Add</button>
              </>
            )}

            {showModal === "bmi" && (
              <>
                <h3 className="text-xl font-bold mb-4">BMI Calculator</h3>
                <input type="number" placeholder="Enter height in cm" className="w-full border px-3 py-2 rounded-xl mb-2" />
                <input type="number" placeholder="Enter weight in kg" className="w-full border px-3 py-2 rounded-xl mb-3" />
                <button className="bg-green-500 text-white w-full py-2 rounded-xl font-bold">Calculate</button>
              </>
            )}

            {showModal === "goals" && (
              <>
                <h3 className="text-xl font-bold mb-4">Set Goals</h3>
                <input type="text" placeholder="e.g. Lose 5kg in 6 weeks" className="w-full border px-3 py-2 rounded-xl mb-3" />
                <button className="bg-purple-600 text-white w-full py-2 rounded-xl font-bold">Save Goal</button>
              </>
            )}

            {showModal === "export" && (
              <>
                <h3 className="text-xl font-bold mb-4">Export Plan</h3>
                <p className="text-sm text-gray-600 mb-2">Export to PDF or download summary.</p>
                <button className="bg-gray-800 text-white w-full py-2 rounded-xl font-bold">⬇️ Export</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const StatCard = ({ title, icon, color, count }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300">
    <div className="text-4xl mb-2">{icon}</div>
    <h2 className="text-lg font-bold">{title}</h2>
    <p className={`text-3xl ${color} font-bold`}>{count}</p>
  </div>
);

const ModalBtn = ({ label, onClick, className = "bg-indigo-900" }) => (
  <button
    onClick={onClick}
    className={`${className} text-white py-3 rounded-xl hover:scale-105 transition text-sm`}
  >
    {label}
  </button>
);
