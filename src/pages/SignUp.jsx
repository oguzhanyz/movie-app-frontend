import { useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../hooks/useStore";

export default function SignUp() {
  const setUser = useStore((state) => state.setUser);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const requestBody = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const res = await fetch("http://127.0.0.1:3000/auth/register", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUser({ userName: data.userName, token: data.userToken });
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  }
  return (
    <>
      <div className="mt-36 flex justify-center">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md"
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-sky-500 py-2 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 active:bg-sky-700"
          >
            Sign Up
          </button>
        </form>
      </div>
      {error && <div className="mt-4 text-center text-red-600">{error}</div>}
    </>
  );
}
