import MainPage from "../components/MainPage";
import Drinks from "../components/Drinks";
import ErrorPage from "../components/ErrorPage";

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
];

export default routes;
