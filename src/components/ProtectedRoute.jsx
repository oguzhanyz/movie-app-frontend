import useStore from "../hooks/useStore";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
