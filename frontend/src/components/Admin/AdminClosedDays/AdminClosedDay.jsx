import getDayOfWeek from "../../../functions/Reservation_Functions/ReservationHelperFunctions";

function AdminClosedDay({ closedDates, handleDelete }) {
  return closedDates.map((x) => (
    <div className="adminClosedday" key={x.dateid}>
      <p key={x.dateid} className="closedDate">
        {x["date"] + " - " + getDayOfWeek(x["date"])}
      </p>
      <button
        className="adminClosedDateDeleteButton"
        onClick={() => handleDelete(x.dateid)}
      >
        Törlés
      </button>
    </div>
  ));
}

export default AdminClosedDay;
