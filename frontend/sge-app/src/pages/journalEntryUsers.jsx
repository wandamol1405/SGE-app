import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/backButton";
import CreateDocsContainer from "../components/createDocs";
import DocsButton from "../components/docsButton";
import DocsButtonContainer from "../components/docsButtonsConteiner";
const API_URL =
  "https://sge-app-production.up.railway.app" || "http://localhost:3000";

function JournalEntryUsers() {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(`${API_URL}/users/`);
            const data = await response.json();
            console.log(data);
            setUsers(data.users);
        }
        fetchUsers();
    }, []);

    const handleSubmit = async (user, e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/journalEntries/pdf`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `JournalEntries-${user.company_name}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
     }

  return (
    <CreateDocsContainer>
      <p>Descargue los asientos contables por usuario</p>
      <DocsButtonContainer>
        {users.map((user) => (
            <DocsButton key={user.id_user} onClick={(e) => handleSubmit(user, e)}>
                {user.company_name}
            </DocsButton>
        ))}
      </DocsButtonContainer>
      <Link to="/home">
        <BackButton>Volver al inicio</BackButton>
      </Link>
    </CreateDocsContainer>
  );
}

export default JournalEntryUsers;
