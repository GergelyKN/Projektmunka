function MyReservation({ clicked, reservations, handleDelete }) {
  return reservations.map((x) => (
    <div className={"reservation-" + x.reservationid} key={x.reservationid}>
      <p>
        {x.roomid +
          ". szoba " +
          x.reservedfrom +
          ":00 - " +
          x.reservedto +
          ":00"}
      </p>
      {clicked[x.reservationid] ? (
        <p>Foglalás törlése folyamatban...</p>
      ) : (
        <button id="deleteButton" onClick={() => handleDelete(x.reservationid)}>
          Törlés
        </button>
      )}
    </div>
  ));
}

export default MyReservation;
