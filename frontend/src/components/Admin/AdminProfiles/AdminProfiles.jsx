import AdminProfile from "./AdminProfile";
import NavBar from "../../Helper_Components/NavBar";
import Footer from "../../Helper_Components/Footer";
import { useEffect, useState } from "react";
import "./AdminProfiles.css";

function AdminProfiles() {
  const GETUSERSAPI = import.meta.env.VITE_API_GETUSERS_URL;
  const DELETEUSERAPI = import.meta.env.VITE_API_DELETEUSER_URL;

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(GETUSERSAPI, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Hiba történt a kapcsolódáskor: ", err);
      }
    };
    fetchUsers();
  }, [GETUSERSAPI]);

  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  const handleDelete = async (userID) => {
    try {
      const response = await fetch(DELETEUSERAPI, {
        mode: "cors",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől:", data.error);
      } else {
        alert(data.message);
        setUsers(users.filter((user) => user.userid !== userID));
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    }
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="mainpage mainpageAdminProfiles">
        {loading ? (
          <p>Betöltés...</p>
        ) : (
          <div className="users">
            {users.length > 0 ? (
              users.map((user) => (
                <AdminProfile
                  key={user.userid}
                  user={user}
                  handleDelete={() => handleDelete(user.userid)}
                />
              ))
            ) : (
              <p>Nem található felhasználó a rendszerben</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AdminProfiles;
