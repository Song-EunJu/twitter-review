import React, {useState, useEffect} from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App() {
  const [user, setUser]=useState(null); // 유저 정보
  const [init, setInit]=useState(false); // 초기화 여부

  useEffect(()=>{
    authService.onAuthStateChanged(user=>{
      if(user){
        setUser({
          disPlayName: user.disPlayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args) 
        })
      }
      else
        setUser(null);
      setInit(true);
    });
  },[]);

  const refreshUser = async() => {
    const user=authService.currentUser;
    setUser({
      disPlayName: user.disPlayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args) 
    });
  }

  return (
    <>
      {
        init ? (
          <AppRouter 
            isLoggedIn={Boolean(user)} 
            user={user}
            refreshUser={refreshUser}
          />
        ) : "Initializing"
      }
      <footer>&copy; {new Date().getFullYear()} Instagram</footer>
    </>
  );
}

export default App;
