function AdminReservation({
  clicked,
  reservations,
  handleDelete,
  dateForReservation,
}) {
  return reservations.map((x) => (
    <div className="adminreservation" key={x.reservationid}>
      <h2>{dateForReservation}</h2>
      <p className="adminReservationP">{x.lastname + " " + x.firstname}</p>
      <p className="adminReservationP">
        {x.roomid +
          ". szoba " +
          x.reservedfrom +
          ":00 - " +
          x.reservedto +
          ":00"}
      </p>
      {clicked[x.reservationid] ? (
        <p className="adminReservationP">Foglalás törlése folyamatban...</p>
      ) : (
        <button
          className="adminReservationSendForm"
          id="deleteButton"
          onClick={() => handleDelete(x.reservationid)}
        >
          Törlés
        </button>
      )}
    </div>
  ));
}

export default AdminReservation;
