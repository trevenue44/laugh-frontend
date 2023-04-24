import React, { useState } from "react";

import { User } from "../_types/user";

interface AuthenticationProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

function Authentication(props: AuthenticationProps): JSX.Element {
  const { setUser } = props;
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const handleNewUserOrNot = (): void => {
    setIsNewUser(!isNewUser);
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
            />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="items-center">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2">
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
            <button className="w-full text-yellow-600 text-base font-semibold py-1 px-3 mt-3 border-2 border-yellow-600 hover:bg-yellow-600 hover:text-white">
              {isNewUser ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
