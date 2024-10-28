import MainPage from "../components/MainPage/MainPage";
import Drinks from "../components/Drinks/Drinks";
import ErrorPage from "../components/Helper_Components/ErrorPage";
import BoardGames from "../components/BoardGames/BoardGames";
import Reservation from "../components/Reservations/Reservation";
import Contact from "../components/Contact/Contact";
import Registration from "../components/Registration/Registration";
import Login from "../components/Login/Login";

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
];

export default routes;
