import React, { useState } from "react";
import axios from "axios";

import { User } from "../_types/user";
import { API_BASE_URL, API_HEADERS } from "../_consts/api";

interface AuthenticationProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Authentication(props: AuthenticationProps): JSX.Element {
  const { setUser } = props;

  // flow control states
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // data states
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //   error control
  const [error, setError] = useState<string | null>("");

  const handleNewUserOrNot = (): void => {
    setIsNewUser(!isNewUser);
  };

  const handleSubmit = async () => {
    const userData = { username, password };

    // setting the endpoint url based on isNewUser
    let endpointURL: string;
    if (isNewUser) {
      endpointURL = `${API_BASE_URL}/accounts/register/`;
    } else {
      endpointURL = `${API_BASE_URL}/accounts/login/`;
    }

    try {
      // sending user details data to backend
      const { data }: { data: User } = await axios.post(endpointURL, userData, {
        headers: API_HEADERS,
      });
      setUser(data);
      // adding the user to local storage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
      setError(`Error ${isNewUser ? "registering" : "logging in"}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-yellow-100 h-screen">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <h1 className="text-3xl block text-center font-semibold">
            {isNewUser ? "Become a Laugher! 😂" : "Let's Laugh 😁"}
          </h1>
          <hr className="mt-3" />
          <div className="mt-3">
            <label htmlFor="username" className="block text-base mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border text-base px-2 py-1 focus:outline-none focus:border-yellow-600 focus:ring-0"
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border text-base px-2 py-1 focus:outline-none focus:border-yellow-600 focus:ring-0"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value.trim())}
              value={password}
            />
          </div>
          {error && (
            <div className="mt-2">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            <div>
              <a
                href="#"
                className="text-yellow-600 text-sm"
                onClick={handleNewUserOrNot}>
                {isNewUser
                  ? "Already have an account."
                  : "New? Become a laugher."}
              </a>
            </div>
          </div>
          <div>
            <button
              className="w-full text-yellow-600 text-base font-semibold py-1 px-3 mt-3 border-2 border-yellow-600 hover:bg-yellow-600 hover:text-white transition-all duration-300"
              onClick={handleSubmit}>
              {isNewUser ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
