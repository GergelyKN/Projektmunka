import AdminBoardGame from "./AdminBoardGame";

function AdminBoardGameCategory({
  boardgames,
  handleDelete,
  handleShowUpdateForm,
}) {
  return (
    <div className="boardGamesByCategory">
      <h2 id="boardGameCategory">{boardgames[0].categoryname}</h2>
      <div className="boardgamenames boardgamenamesadmin">
        {boardgames.map((boardgame) => (
          <AdminBoardGame
            key={boardgame.boardgameid}
            boardgame={boardgame}
            handleDelete={() => handleDelete(boardgame.boardgameid)}
            handleShowUpdateForm={() =>
              handleShowUpdateForm(boardgame.boardgameid)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default AdminBoardGameCategory;
