function AdminBoardGame({ boardgame, handleDelete, handleShowUpdateForm }) {
  return (
    <div className="boardgame boardgameAdmin">
      <h4>
        {boardgame.name +
          " -- " +
          boardgame.difficulty +
          " -- " +
          boardgame.language +
          " -- " +
          boardgame.minplayernum +
          " - " +
          boardgame.maxplayernum +
          " Fő"}
      </h4>
      <h5>{boardgame.description}</h5>
      <div className="buttons">
        <button
          className="adminBoardGameButton"
          id="deleteButton"
          onClick={handleDelete}
        >
          Törlés
        </button>
        <button
          className="adminBoardGameButton"
          id="updateButton"
          onClick={handleShowUpdateForm}
        >
          Módosítás
        </button>
      </div>
    </div>
  );
}

export default AdminBoardGame;
