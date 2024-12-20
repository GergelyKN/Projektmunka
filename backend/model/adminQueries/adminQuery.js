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
      `UPDATE drinks SET name = $1, size = $2, price = $3, containsalcohol = $4, alcoholstrength = $5, description = $6, categoryid = $7 WHERE drinkid = $8`,
      [
        drink.name,
        drink.size,
        drink.price,
        drink.containsalcohol,
        drink.alcoholstrength,
        drink.description,
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
      "INSERT INTO drinks (name, size, price, containsalcohol, alcoholstrength, description, categoryid) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        drink.name,
        drink.size,
        drink.price,
        drink.containsalcohol,
        drink.alcoholstrength,
        drink.description,
        drink.categoryid,
      ]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    const { rows } = await pool.query(
      "SELECT drinkid FROM drinks WHERE name = $1 AND size = $2 AND price = $3",
      [drink.name, drink.size, drink.price]
    );

    await pool.query(
      "INSERT INTO drinkstorage (drinkid, quantity) VALUES ($1,50) ",
      [rows[0].drinkid]
    );
    return { success: true };
  } catch (err) {
    console.error("Hiba történt az ital hozzáadásakor: ", err);
    throw err;
  }
}
async function addDrinkCategory(categoryname, alcoholic) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO drinkcategory (categoryname, alcoholic) VALUES  ($1,$2)",
      [categoryname, alcoholic]
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
async function updateDrinkCategory(
  categoryname,
  updatedname,
  updatedalcoholic
) {
  try {
    const { rowCount } = await pool.query(
      `UPDATE drinkcategory SET categoryname = $2, alcoholic = $3 WHERE categoryname = $1`,
      [categoryname, updatedname, updatedalcoholic]
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

async function updateDrinksForCategoryChange(drinks, alcoholic) {
  try {
    for (const drink of drinks) {
      await pool.query(
        "UPDATE Drinks SET containsalcohol = $1 WHERE drinkid = $2",
        [alcoholic, drink["drinkid"]]
      );
    }
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
      "INSERT INTO boardgames (name, difficulty, minplayernum, maxplayernum, languageid, description, categoryid) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        boardgame.name,
        boardgame.difficulty,
        boardgame.minplayernum,
        boardgame.maxplayernum,
        boardgame.languageid,
        boardgame.description,
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
      `UPDATE boardgames SET name = $1, difficulty = $2, minplayernum = $3, maxplayernum = $4, languageid = $5, description = $6, categoryid = $7 WHERE boardgameid = $8`,
      [
        boardgame.name,
        boardgame.difficulty,
        boardgame.minplayernum,
        boardgame.maxplayernum,
        boardgame.languageid,
        boardgame.description,
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
async function getAllReservations() {
  try {
    const { rows } = await pool.query(
      "SELECT reservationid,users.userid,reservations.roomid,date,reservedfrom,reservedto,users.firstname,users.lastname,roomprofile.capacity FROM Reservations INNER JOIN users ON users.userid = reservations.userid INNER JOIN roomprofile ON roomprofile.roomid = reservations.roomid ORDER BY date DESC, reservedfrom DESC;"
    );
    return { success: true, rows };
  } catch (err) {
    console.error("Hiba történt a foglalások lekérdezése közben:", err);
    throw err;
  }
}
async function deleteReservation(reservationid) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM reservations WHERE reservationid = $1",
      [reservationid]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a foglalás törlésekor:", err);
    throw err;
  }
}

async function addClosedDate(dateForClose) {
  try {
    const { rowCount } = await pool.query(
      "INSERT INTO closeddate (date) VALUES ($1)",
      [dateForClose]
    );
    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a nap hozzáadásakor: ", err);
    throw err;
  }
}

async function deleteClosedDate(dateid) {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM closeddate WHERE dateid = $1",
      [dateid]
    );

    if (rowCount === 0) {
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("Hiba történt a nap törlésekor:", err);
    throw err;
  }
}

async function getReservationsByReservationID(reservationid) {
  try {
    const { rows } = await pool.query(
      "SELECT reservationid,users.userid,date,reservedfrom,reservedto, users.email, roomprofile.roomid FROM Reservations INNER JOIN users ON users.userid = reservations.userid INNER JOIN roomprofile ON roomprofile.roomid = reservations.roomid WHERE reservations.reservationid = $1 ORDER BY date;",
      [reservationid]
    );
    return { rows };
  } catch (err) {
    console.error("Hiba történt a foglalások lekérdezése közben:", err);
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
  getAllReservations,
  deleteReservation,
  addClosedDate,
  deleteClosedDate,
  getReservationsByReservationID,
  updateDrinksForCategoryChange,
};
