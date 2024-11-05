import MainPage from "../components/MainPage/MainPage";
import Drinks from "../components/Drinks/Drinks";
import ErrorPage from "../components/Helper_Components/ErrorPage";
import BoardGames from "../components/BoardGames/BoardGames";
import Reservation from "../components/Reservations/Reservation";
import Contact from "../components/Contact/Contact";
import Registration from "../components/Registration/Registration";
import Login from "../components/Login/Login";
import AdminPage from "../components/Admin/AdminPage/AdminPage";
import AdminRoute from "../components/Admin/AdminRoute/AdminRoute";

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
    path: "/admin/italok",
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
  },
];

export default routes;
