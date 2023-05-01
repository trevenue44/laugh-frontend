import React, { useState, useEffect } from "react";

import Authentication from "./pages/auth";
import Home from "./pages/home";
import { User } from "./_types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // if the user is already logged in, we set the user state to the user in local storage
    // if the user asked to be remembered
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return <>{user !== null ? <Authentication setUser={setUser} /> : <Home />}</>;
}

export default App;
