import React, {useState} from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App() {
  const [user, setUser]=useState(false); // 유저 정보
  const [init, setInit]=useState(false); // 초기화 여부

  authService.onAuthStateChanged(user=>{
    if(user){
      setUser(user);
      console.log(user)
    }
    else
      setUser(null);
    setInit(true);
  });

  // const refreshUser = () => {
  //   user.updateProfile({
  //     disPlayName:disPlayName
  //   })
  // }

  return (
    <>
      {
        init ? <AppRouter isLoggedIn={Boolean(user)} user={user}/> : "Initializing"
      }
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
