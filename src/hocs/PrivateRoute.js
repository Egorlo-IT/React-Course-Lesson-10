import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../redux/store/selectors/getCurrentUser";

const PrivateRoute = () => {
  const userCurrent = useSelector(getCurrentUser());

  return userCurrent?.displayName ? <Outlet /> : <Navigate to="/cats" />;
};

export default PrivateRoute;
