import React from "react";
import {Link} from "react-router-dom";
const Navigation = ({user}) => {
    return (
        <>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/profile">
                    <li>{user.displayName ? `${user.displayName}'s Profile` : "Profile"}</li>
                </Link>
            </ul>
        </>
    )
}
export default Navigation;