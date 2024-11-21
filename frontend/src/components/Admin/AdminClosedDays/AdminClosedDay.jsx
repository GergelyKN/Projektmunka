import getDayOfWeek from "../../../functions/Reservation_Functions/ReservationHelperFunctions";

function AdminClosedDay({ closedDates, handleDelete }) {
  return closedDates.map((x) => (
    <div
      className={"closedday-" + x.dateid}
      style={{ border: "1px solid blue" }}
      key={x.dateid}
    >
      <p key={x.dateid} className="closedDate">
        {x["date"] + " - " + getDayOfWeek(x["date"])}
      </p>
      <button id="deleteButton" onClick={() => handleDelete(x.dateid)}>
        Törlés
      </button>
    </div>
  ));
}

export default AdminClosedDay;
