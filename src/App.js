import React, { useState, useEffect } from "react";

const defaultMembers = [
  { id: 1, name: "Jan", visits: 5, username: "jan123", password: "wachtwoord1" },
  { id: 2, name: "Sanne", visits: 3, username: "sanne456", password: "wachtwoord2" },
];

const adminCredentials = { username: "admin", password: "admin" };

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState(defaultMembers);
  const [newMemberName, setNewMemberName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Set document title to "BDFF"
  useEffect(() => {
    document.title = "BDFF";
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (username === adminCredentials.username && password === adminCredentials.password) {
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
    if (!newMemberName.trim() || !newUsername.trim() || !newPassword.trim()) {
      alert("Vul alle velden in");
      return;
    }
    const newMember = {
      id: members.length ? members[members.length - 1].id + 1 : 1,
      name: newMemberName.trim(),
      visits: 0,
      username: newUsername.trim(),
      password: newPassword.trim(),
    };
    setMembers([...members, newMember]);
    setNewMemberName("");
    setNewUsername("");
    setNewPassword("");
  }

  function incrementVisits(id) {
    setMembers(members.map(m => m.id === id ? { ...m, visits: m.visits + 1 } : m));
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <h1>BDFF</h1>
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
        <div style={styles.topRight}>
          {/* Uitlogknop zichtbaar rechtsboven */}
          <button onClick={handleLogout} style={styles.logoutButton}>Uitloggen</button>
        </div>

        <h1>Admin-menu - BDFF</h1>

        <h2>Leden toevoegen</h2>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Naam nieuw lid"
            value={newMemberName}
            onChange={e => setNewMemberName(e.target.value)}
            style={styles.inputSmall}
          />
          <input
            type="text"
            placeholder="Gebruikersnaam"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            style={styles.inputSmall}
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            style={styles.inputSmall}
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
                <th>Gebruikersnaam</th>
                <th>Wachtwoord</th>
                <th>Aantal bezoeken</th>
                <th>Bezoek toevoegen</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.username}</td>
                  <td>{member.password}</td>
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
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    border: "1px solid #ccc",
    borderRadius: 6,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
    minHeight: "400px",
  },
  topRight: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
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
  inputSmall: {
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #aaa",
    marginRight: 8,
    width: "30%",
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#0077cc",
    color: "#fff",
    cursor: "pointer",
    marginTop: 5,
  },
  logoutButton: {
    padding: "8px 12px",
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
