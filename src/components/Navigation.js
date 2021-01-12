import React from "react";
import {Link} from "react-router-dom";
const Navigation = () => {
    return (
        <>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/profile">
                    <li>My Profile</li>
                </Link>
            </ul>
        </>
    )
}
export default Navigation;