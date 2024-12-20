function AdminProfile({ user, handleDelete }) {
  return (
    <div className={"user"}>
      <h4>{user.lastname + " " + user.firstname + " - " + user.email}</h4>
      <button
        className="adminProfileSendForm"
        id="deleteButton"
        onClick={handleDelete}
      >
        Törlés
      </button>
    </div>
  );
}

export default AdminProfile;
