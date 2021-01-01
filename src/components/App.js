import React, {useState} from "react";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setLoggedIn]=useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
