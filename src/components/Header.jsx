import { NavLink } from "react-router";
import useStore from "../hooks/useStore";

export default function Header() {
  const user = useStore((state) => state.user);

  return (
    <nav className="flex justify-between bg-sky-300 px-2 py-4">
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
        <p>Welcome, {user.userName}</p>
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
