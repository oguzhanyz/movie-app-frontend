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
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" className="border-[1px]" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="border-[1px]" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="border-[1px]" />
          </div>
          <button type="submit" className="bg-slate-200">
            Sign Up
          </button>
        </form>
      </div>
      {error && <div className="text-center text-red-600">{error}</div>}
    </>
  );
}
