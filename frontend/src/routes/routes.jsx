import MainPage from "../components/MainPage/MainPage";
import Drinks from "../components/Drinks/Drinks";
import ErrorPage from "../components/Helper_Components/ErrorPage";
import BoardGames from "../components/BoardGames/BoardGames";
import Reservation from "../components/Reservations/Reservation";
import Contact from "../components/Contact/Contact";
import Registration from "../components/Registration/Registration";
import Login from "../components/Login/Login";
import AdminDrinks from "../components/Admin/AdminDrinks/AdminDrinks";
import AdminBoardGames from "../components/Admin/AdminBoardGames/AdminBoardGames";
import AdminRoute from "../components/Admin/AdminRoute/AdminRoute";
import EditProfile from "../components/EditProfile/EditProfile";
import RePassword from "../components/RePassword/RePassword";
import AdminReservations from "../components/Admin/AdminReservations/AdminReservations";
import AdminClosedDays from "../components/Admin/AdminClosedDays/AdminClosedDays";
import MyReservations from "../components/MyReservations/MyReservations";
import RoomRoute from "../components/Rooms/RoomRoute";
import UserRoute from "../components/UserRoute/UserRoute";
import ReservationRoute from "../components/ReservationRoute/ReservationRoute";
import RoomDrinks from "../components/Rooms/RoomDrinks/RoomDrinks";
import RoomOrder from "../components/Rooms/RoomOrder";
import AdminProfiles from "../components/Admin/AdminProfiles/AdminProfiles";

const routes = [
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/italok",
    element: <Drinks />,
  },
  {
    path: "/tarsasjatekok",
    element: <BoardGames />,
  },
  {
    path: "/foglalas",
    element: (
      <ReservationRoute>
        <Reservation />
      </ReservationRoute>
    ),
  },
  {
    path: "/kapcsolat",
    element: <Contact />,
  },
  {
    path: "/bejelentkezes",
    element: <Login />,
  },
  {
    path: "/regisztracio",
    element: <Registration />,
  },
  {
    path: "/profilszerkesztes",
    element: (
      <UserRoute>
        <EditProfile />
      </UserRoute>
    ),
  },
  {
    path: "/jelszoemlekezteto",
    element: <RePassword />,
  },
  {
    path: "/sajatfoglalasok",
    element: (
      <UserRoute>
        <MyReservations />
      </UserRoute>
    ),
  },
  {
    path: "/italokrendeles",
    element: (
      <UserRoute>
        <RoomRoute>
          <RoomDrinks />
        </RoomRoute>
      </UserRoute>
    ),
  },
  {
    path: "/rendelesleadas",
    element: (
      <UserRoute>
        <RoomRoute>
          <RoomOrder />
        </RoomRoute>
      </UserRoute>
    ),
  },

  {
    path: "/admin/italok",
    element: (
      <AdminRoute>
        <AdminDrinks />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/tarsasjatekok",
    element: (
      <AdminRoute>
        <AdminBoardGames />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/foglalas",
    element: (
      <AdminRoute>
        <AdminReservations />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/zartnapok",
    element: (
      <AdminRoute>
        <AdminClosedDays />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/profilok",
    element: (
      <AdminRoute>
        <AdminProfiles />
      </AdminRoute>
    ),
  },
];

export default routes;