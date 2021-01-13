import React, {useState} from "react";
import { authService } from "../fbase";

const Profile = ({user}) => {
    const [newDisPlayName,setNewDisPlayName]=useState("");
    const logOut = () => {
        authService.signOut();
    }

    const onChange = (event) => {
        const {target:{value}}=event;
        setNewDisPlayName(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        user.updateProfile({
            disPlayName:newDisPlayName
        })
        
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={newDisPlayName}
                    required
                    onChange={onChange}
                />
                <input 
                    type="submit"
                    value="Update Profile"
                />
            </form>
            <div>

            </div>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export default Profile;