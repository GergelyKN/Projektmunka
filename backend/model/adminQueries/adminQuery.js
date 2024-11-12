const pool = require("../pool");

async function deleteDrink(drinkID) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM drinks WHERE drinkid = $1",
      [drinkID]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt az ital törlésekor:", err);
    throw err;
  }
}
async function updateDrink(drink) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE drinks SET name = $1, size = $2, price = $3, containsalcohol = $4, alcoholstrength = $5, imagepath = $6, categoryid = $7 WHERE drinkid = $8`,
      [
        drink.name,
        drink.size,
        drink.price,
        drink.containsalcohol,
        drink.alcoholstrength,
        drink.imagepath,
        drink.categoryid,
        drink.drinkid,
      ]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt az ital frissítésekor:", err);
    throw err;
  }
}
async function addDrink(drink) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO drinks (name, size, price, containsalcohol, alcoholstrength, imagepath, categoryid) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        drink.name,
        drink.size,
        drink.price,
        drink.containsalcohol,
        drink.alcoholstrength,
        drink.imagepath,
        drink.categoryid,
      ]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt az ital hozzáadásakor: ", err);
    throw err;
  }
}
async function addDrinkCategory(categoryname) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO drinkcategory (categoryname) VALUES  ($1)",
      [categoryname]
    );

    if (rowCount === 0) {
      return { success: true };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a kategória hozzáadásakor: ", err);
    throw err;
  }
}
async function deleteDrinkCategory(categoryname) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM drinkcategory WHERE categoryname = $1",
      [categoryname]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a kategória törlésekor:", err);
    throw err;
  }
}
async function updateDrinkCategory(categoryname, updatedname) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE drinkcategory SET categoryname = $2 WHERE categoryname = $1`,
      [categoryname, updatedname]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a kategória frissítésekor:", err);
    throw err;
  }
}

async function addBoardGameCategory(categoryname) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO boardgamecategory (categoryname) VALUES  ($1)",
      [categoryname]
    );

    if (rowCount === 0) {
      return { success: true };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a kategória hozzáadásakor: ", err);
    throw err;
  }
}
async function deleteBoardGameCategory(categoryname) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM boardgamecategory WHERE categoryname = $1",
      [categoryname]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a kategória törlésekor:", err);
    throw err;
  }
}
async function updateBoardGameCategory(categoryname, updatedname) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE boardgamecategory SET categoryname = $2 WHERE categoryname = $1`,
      [categoryname, updatedname]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a kategória frissítésekor:", err);
    throw err;
  }
}
async function deleteBoardGame(boardgameID) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM boardgames WHERE boardgameid = $1",
      [boardgameID]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a társasjáték törlésekor:", err);
    throw err;
  }
}
async function addBoardGame(boardgame) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO boardgames (name, difficulty, minplayernum, maxplayernum, languageid, imagepath, categoryid) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        boardgame.name,
        boardgame.difficulty,
        boardgame.minplayernum,
        boardgame.maxplayernum,
        boardgame.languageid,
        boardgame.imagepath,
        boardgame.categoryid,
      ]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a társasjáték hozzáadásakor: ", err);
    throw err;
  }
}
async function updateBoardGame(boardgame) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE boardgames SET name = $1, difficulty = $2, minplayernum = $3, maxplayernum = $4, languageid = $5, imagepath = $6, categoryid = $7 WHERE boardgameid = $8`,
      [
        boardgame.name,
        boardgame.difficulty,
        boardgame.minplayernum,
        boardgame.maxplayernum,
        boardgame.languageid,
        boardgame.imagepath,
        boardgame.categoryid,
        boardgame.boardgameid,
      ]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a társasjáték frissítésekor:", err);
    throw err;
  }
}
module.exports = {
  deleteDrink,
  updateDrink,
  addDrink,
  addDrinkCategory,
  deleteDrinkCategory,
  updateDrinkCategory,
  addBoardGameCategory,
  deleteBoardGameCategory,
  updateBoardGameCategory,
  deleteBoardGame,
  updateBoardGame,
  addBoardGame,
};
