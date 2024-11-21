import BoardGame from "./BoardGame";

function BoardGameCategory({ boardgames }) {
  return (
    <div className={"boardgamecategory-" + boardgames[0].categoryid}>
      <h2 id={"categoryname-" + boardgames[0].categoryid}>
        {boardgames[0].categoryname}
      </h2>
      {boardgames.map((boardgame) => (
        <BoardGame key={boardgame.boardgameid} boardgame={boardgame} />
      ))}
    </div>
  );
}

export default BoardGameCategory;
