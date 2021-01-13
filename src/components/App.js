import React, {useState, useEffect, useCallback} from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App() {
  const [init, setInit]=useState(false); // 초기화 여부
  const [userObj, setUserObj]=useState(null); // 유저 정보

  useEffect(()=>{
    authService.onAuthStateChanged(user=>{
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args) 
        })
      }
      else
        setUserObj(null);
      setInit(true);
    });
  },[]);

  const refreshUser = useCallback(async () => {
    const user=authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  },[setUserObj]);

  return (
    <>
      {
        init ? (
          <AppRouter 
            isLoggedIn={Boolean(userObj)} 
            userObj={userObj}
            refreshUser={refreshUser}
          />
        ) : "Initializing"
      }
      <footer>&copy; {new Date().getFullYear()} Instagram</footer>
    </>
  );
}

export default App;
