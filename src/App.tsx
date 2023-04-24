import React, { useState, useEffect } from "react";

import Authentication from "./pages/auth";
import { User } from "./_types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // const user = localStorage.getItem("user");
    // if (user) {
    //   setUser(JSON.parse(user));
    // }
    setUser({ id: 1, username: "test" });
  }, []);

  return (
    <>
      {user === null ? <Authentication setUser={setUser} /> : <div>Home</div>}
    </>
  );
}

export default App;
