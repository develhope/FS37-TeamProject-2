import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser, logout } = useAuth(); 
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.email === user.email);
    setProfile(currentUser || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u =>
      u.email === user.email ? profile : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(profile);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#006450]">Dashboard</h1>
        <Button label="secondary" operazione={handleLogout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Box dati profilo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Dati Profilo</h2>
          
          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="nome"
                autoComplete="off"
                value={profile.nome || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Nome"
              />
              <input
                type="text"
                name="cognome"
                autoComplete="off"
                value={profile.cognome || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Cognome"
              />
              <input
                type="email"
                name="email"
                autoComplete="off"
                value={profile.email || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Email"
              />
              <input
                type="tel"
                name="telefono"
                autoComplete="off"
                value={profile.telefono || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Telefono"
              />
              <div className="flex justify-end mt-3">
                <Button label="primary" operazione={handleSave}>Salva</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Nome:</strong> {profile.nome}</p>
              <p><strong>Cognome:</strong> {profile.cognome}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Telefono:</strong> {profile.telefono}</p>
              <div className="flex justify-end mt-3">
                <Button label="secondary" operazione={() => setEditing(true)}>Modifica</Button>
              </div>
            </div>
          )}
        </div>

        {/* Box La mia ASL */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">La mia ASL</h2>
          <p><strong>Nome ASL:</strong> Esempio SRL</p>
          <p><strong>Indirizzo:</strong> Via Esempio 123, Città</p>
          <p><strong>Numero contatto:</strong> 0123-456789</p>
          <Button label= "primary">Cambia ASL</Button>
        </div>

      </div>
    </main>
  );
}

export default Dashboard;
