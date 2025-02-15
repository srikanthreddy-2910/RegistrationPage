import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const { registeredEmail, registeredPassword } = location.state || {};

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    if (
      loginData.email === registeredEmail &&
      loginData.password === registeredPassword
    ) {
      alert("Login Successful!");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="Container min-h-screen flex items-center justify-center px-4">
      <div className="main-container w-full max-w-md bg-gray-700   rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full p-2 mt-1 rounded-md bg-gray-600 text-white"
            />
          </div>

          <button
            onClick={handleLogin}
            className="button w-full mt-6 p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
