import React, { useEffect } from "react";
import { authService } from "../fbase";

const Profile = () => {
    const logOut = () => {
        authService.signOut();
    }

    return (
        <button onClick={logOut}>Log Out</button>
    )
}

export default Profile;