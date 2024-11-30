function MyReservation({
  clicked,
  reservations,
  handleDelete,
  dateForReservation,
}) {
  return reservations.map((x) => (
    <div className={"myreservation"} key={x.reservationid}>
      <h2>{dateForReservation}</h2>
      <p className="myReservationP">
        {x.roomid +
          ". szoba " +
          x.reservedfrom +
          ":00 - " +
          x.reservedto +
          ":00"}
      </p>
      {clicked[x.reservationid] ? (
        <p className="myReservationP ">Foglalás törlése folyamatban...</p>
      ) : (
        <button
          id="deleteButton"
          className="MyReservationSendForm"
          onClick={() => handleDelete(x.reservationid)}
        >
          Törlés
        </button>
      )}
    </div>
  ));
}

export default MyReservation;
