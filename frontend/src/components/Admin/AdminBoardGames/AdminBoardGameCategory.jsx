import AdminBoardGame from "./AdminBoardGame";

function AdminBoardGameCategory({
  boardgames,
  handleDelete,
  handleShowUpdateForm,
}) {
  return (
    <div className={"boardgamecategory-" + boardgames[0].categoryid}>
      <h2 id={"categoryname-" + boardgames[0].categoryid}>
        {boardgames[0].categoryname}
      </h2>
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
  );
}

export default AdminBoardGameCategory;
