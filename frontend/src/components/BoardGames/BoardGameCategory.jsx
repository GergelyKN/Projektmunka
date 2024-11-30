import BoardGame from "./BoardGame";

function BoardGameCategory({ boardgames }) {
  return (
    <div className="boardgamesByCategory">
      <div className="boardgamecategory">
        <h2>{boardgames[0].categoryname}</h2>
      </div>
      <div className="boardgamenames">
        {boardgames.map((boardgame) => (
          <BoardGame key={boardgame.boardgameid} boardgame={boardgame} />
        ))}
      </div>
    </div>
  );
}

export default BoardGameCategory;
