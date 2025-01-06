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
    <nav className="mb-4 flex flex-col items-center justify-between gap-4 bg-sky-300 px-2 py-4 sm:flex-row">
      <NavLink to="/" end>
        <h4 className="text-lg sm:text-xl">Movie App</h4>
      </NavLink>
      <div className="mt-2 flex flex-col gap-4 text-center sm:mt-0 sm:flex-row sm:gap-16">
        <NavLink to="/search" end>
          Search
        </NavLink>
        <NavLink to="/watchlist" end>
          Watchlist
        </NavLink>
      </div>
      {user !== null ? (
        <div className="mt-2 flex flex-col items-center gap-2 sm:mt-0 sm:flex-row sm:gap-4">
          <p className="text-sm sm:text-base">Welcome, {user.userName}</p>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 p-1 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <NavLink
            to="/login"
            className="rounded-md bg-green-600 px-2 py-1 hover:scale-105 active:scale-95"
            end
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="rounded-md bg-green-600 px-2 py-1 hover:scale-105 active:scale-95"
            end
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
}
