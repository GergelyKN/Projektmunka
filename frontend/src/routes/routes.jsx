import MainPage from "../components/MainPage";
import Drinks from "../components/Drinks";
import ErrorPage from "../components/ErrorPage";
import BoardGames from "../components/BoardGames";
import Reservation from "../components/Reservation";
import Contact from "../components/Contact";

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
];

export default routes;
