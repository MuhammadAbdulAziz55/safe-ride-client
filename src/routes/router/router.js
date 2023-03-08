import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../Pages/Home/Home";
import Destination from "../../Pages/Destination/Destination";
import Blog from "../../Pages/Blog/Blog";
import Contact from "../../Pages/Contact/Contact";
import Login from "../../Pages/Login/Login";
import CreateNewAccount from "../../Pages/CreateNewAccount/CreateNewAccount";
import Logout from "../../Pages/Logout/Logout";
import PrivateRoute from "../private-route/PrivateRoute";
import VehiclesDetailInfo from "../../Pages/VehiclesDetailInfo/VehiclesDetailInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/destination",
        element: <Destination />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-new-account",
        element: <CreateNewAccount />,
      },
      {
        path: "/logout",
        element: (
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        ),
      },
      {
        path: "/vehicles-details-info/:id",
        element: (
          <PrivateRoute>
            <VehiclesDetailInfo />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://safe-ride-server.vercel.app/vehicles-details-info/${params.id}`
          ),
      },
    ],
  },
]);
