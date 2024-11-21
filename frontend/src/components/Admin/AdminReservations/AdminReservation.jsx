function AdminReservation({ reservations, handleDelete }) {
  return reservations.map((x) => (
    <div
      className={"reservation-" + x.reservationid}
      style={{ border: "1px solid blue" }}
      key={x.reservationid}
    >
      <p>{x.lastname + " " + x.firstname}</p>
      <p>
        {x.roomid +
          ". szoba " +
          x.reservedfrom +
          ":00 - " +
          x.reservedto +
          ":00"}
      </p>
      <button id="deleteButton" onClick={() => handleDelete(x.reservationid)}>
        Törlés
      </button>
    </div>
  ));
}

export default AdminReservation;
