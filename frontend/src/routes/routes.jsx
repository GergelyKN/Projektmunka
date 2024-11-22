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
import Room from "../components/Rooms/Room";
import UserRoute from "../components/UserRoute/UserRoute";

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
    element: <Reservation />,
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
    path: "/szoba",
    element: (
      <UserRoute>
        <Room />
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
];

export default routes;
