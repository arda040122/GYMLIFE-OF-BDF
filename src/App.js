import React, { useState } from "react";

const defaultMembers = [
  { id: 1, name: "Jan", visits: 5 },
  { id: 2, name: "Sanne", visits: 3 }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState(defaultMembers);
  const [newMemberName, setNewMemberName] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setUser({ role: "admin", name: "admin" });
    } else {
      alert("Foutieve gebruikersnaam of wachtwoord");
    }
  }

  function handleLogout() {
    setUser(null);
    setUsername("");
    setPassword("");
  }

  function addMember() {
    if (!newMemberName.trim()) return;
    const newMember = {
      id: members.length ? members[members.length - 1].id + 1 : 1,
      name: newMemberName.trim(),
      visits: 0,
    };
    setMembers([...members, newMember]);
    setNewMemberName("");
  }

  function incrementVisits(id) {
    setMembers(members.map(m => m.id === id ? {...m, visits: m.visits + 1} : m));
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <h1>BDF GYM life</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Gebruikersnaam"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Inloggen</button>
        </form>
      </div>
    );
  }

  if (user.role === "admin") {
    return (
      <div style={styles.container}>
        <h1>Admin-menu - BDF GYM life</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Uitloggen</button>

        <h2>Leden toevoegen</h2>
        <div style={{marginBottom: 20}}>
          <input
            type="text"
            placeholder="Nieuwe lid naam"
            value={newMemberName}
            onChange={e => setNewMemberName(e.target.value)}
            style={styles.input}
          />
          <button onClick={addMember} style={styles.button}>Toevoegen</button>
        </div>

        <h2>Leden overzicht</h2>
        {members.length === 0 ? (
          <p>Geen leden toegevoegd.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Naam</th>
                <th>Aantal bezoeken</th>
                <th>Bezoek toevoegen</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.visits}</td>
                  <td>
                    <button onClick={() => incrementVisits(member.id)} style={styles.smallButton}>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return null;
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "50px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    border: "1px solid #ccc",
    borderRadius: 6,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #aaa",
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#0077cc",
    color: "#fff",
    cursor: "pointer",
  },
  logoutButton: {
    marginBottom: 20,
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#cc3300",
    color: "#fff",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  smallButton: {
    padding: "5px 10px",
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  }
};

if (!user) {
  return (
    <div style={styles.container}>
      <h1>BDF GYM life</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Gebruikersnaam"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Inloggen</button>
      </form>
    </div>
  );
}
