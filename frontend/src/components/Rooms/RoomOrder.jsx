import RoomNavBar from "./RoomNavBar";
import Footer from "../Helper_Components/Footer";
import { useEffect, useState, useContext } from "react";
import { ReservationIDContext } from "./RoomRoute";

function RoomOrder() {
  const POSTORDERAPI = import.meta.env.VITE_API_POSTORDERITEMS_URL;
  const GETDRINKAPI = import.meta.env.VITE_API_DRINK_URL;
  const ResID = useContext(ReservationIDContext);

  const [drinks, setDrinks] = useState([]);
  const [drinksToDisplay, setDrinksToDisplay] = useState([]);
  const [orderToSend, setOrderToSend] = useState({});
  const [priceForAll, setPriceForAll] = useState(0);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    const savedOrder = JSON.parse(
      localStorage.getItem("quantitiesToSend") || "{}"
    );
    setOrderToSend(savedOrder);
  }, []);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(GETDRINKAPI, {
          mode: "cors",
        });

        if (response.status >= 400) {
          throw new Error("Server Error");
        }
        const data = await response.json();

        setDrinks(data);
      } catch (error) {
        console.error("Error fetching drinks: ", error);
      }
    };

    fetchDrinks();
  }, [GETDRINKAPI]);

  const handleSubmit = async (event) => {
    setClicked(true);
    event.preventDefault();
    try {
      const response = await fetch(POSTORDERAPI, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderToSend, reservationid: ResID }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Hibaüzenet a szerver felől: ", data.error);
      } else {
        setClicked(false);
        alert(data.message);
      }
    } catch (err) {
      console.error("Hiba történt a kapcsolódáskor: ", err);
    } finally {
      localStorage.removeItem("quantitiesToSend");
      setOrderToSend({});
      setDrinksToDisplay([]);
    }
  };

  useEffect(() => {
    const orderKeys = Object.keys(orderToSend).map((x) => Number(x));
    const drinksWithQuantity = drinks
      .filter((drink) => orderKeys.includes(drink.drinkid))
      .map((drink) => ({
        ...drink,
        quantity: orderToSend[drink.drinkid],
      }));

    let sum = 0;
    for (const x of drinksWithQuantity) {
      sum = sum + Number(x.price) * Number(x.quantity);
    }

    setPriceForAll(sum);
    setDrinksToDisplay(drinksWithQuantity);
  }, [drinks, orderToSend]);

  const handleQuantityChange = (drinkid, event) => {
    console.log(event.target.value);
    if (Number(event.target.value) === 0) {
      handleDelete(drinkid);
    } else {
      const updatedOrder = { ...orderToSend };
      updatedOrder[drinkid] = Number(event.target.value);
      localStorage.setItem("quantitiesToSend", JSON.stringify(updatedOrder));
      setOrderToSend(updatedOrder);
      console.log("Frissített rendelés:", updatedOrder);
    }
  };
  const handleDelete = (drinkid) => {
    const updatedOrder = { ...orderToSend };
    delete updatedOrder[drinkid];

    localStorage.setItem("quantitiesToSend", JSON.stringify(updatedOrder));

    setOrderToSend(updatedOrder);
    console.log("Frissített rendelés:", updatedOrder);
  };

  return (
    <>
      <RoomNavBar />
      <h4>Rendelés összegző</h4>
      {
        <div>
          {drinksToDisplay.length > 0 ? (
            drinksToDisplay.map((drink) => (
              <div
                key={drink.drinkid}
                className="drink"
                style={{
                  border: "1px solid red",
                  padding: "5px 0",
                  margin: "5px 0",
                }}
              >
                <label htmlFor="drinkQuantity">Mennyiség: </label>
                <input
                  type="number"
                  value={drink.quantity}
                  name="drinkQuantity"
                  id="drinkQuantity"
                  onChange={(event) =>
                    handleQuantityChange(drink.drinkid, event)
                  }
                  min={0}
                  max={12}
                />
                <p key={drink.drinkid}>
                  {drink.name +
                    " " +
                    drink.quantity +
                    " db " +
                    " ==> " +
                    drink.price * drink.quantity +
                    " Ft"}
                </p>
                <button onClick={() => handleDelete(drink.drinkid)}>
                  Ital törlése
                </button>
              </div>
            ))
          ) : (
            <p>Jelenleg nincs semmi a kosárban!</p>
          )}
        </div>
      }
      <p>{"Összesen: " + priceForAll + " Ft"}</p>
      {clicked ? (
        <p>Fizetés feldolgozás alatt...</p>
      ) : (
        <button onClick={handleSubmit} disabled={drinksToDisplay.length === 0}>
          Rendelés leadása
        </button>
      )}

      <Footer />
    </>
  );
}

export default RoomOrder;
