import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import useStore from "../hooks/useStore";

export default function Header() {
  const user = useStore((state) => state.user);
  const reset = useStore((state) => state.reset);
  let navigate = useNavigate();

  function handleLogout() {
    reset();
    useStore.persist.clearStorage();
    navigate("/");
  }

  return (
    <nav className="mb-4 flex items-center justify-between bg-sky-300 px-2 py-4">
      <NavLink to="/" end>
        <h4>Movie App</h4>
      </NavLink>
      <div className="flex gap-16">
        <NavLink to="/search" end>
          Search
        </NavLink>
        <NavLink to="/watchlist" end>
          Watchlist
        </NavLink>
      </div>
      {user !== null ? (
        <div className="flex items-center gap-4">
          <p>Welcome, {user.userName}</p>
          <button onClick={handleLogout} className="rounded-md bg-red-500 p-1">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <NavLink to="/login" end>
            Login
          </NavLink>
          <NavLink to="/signup" end>
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
}
