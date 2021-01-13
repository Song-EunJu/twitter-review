import React, {useEffect, useState} from "react";
import Instagram from "../components/Instagram";
import { authService, dbService } from "../fbase";

const Profile = ({user, refreshUser}) => {
    const [newDisPlayName,setNewDisPlayName]=useState(user.disPlayName);
    const [postArray, setPostArray] =useState([]);

    const logOut = () => {
        authService.signOut();
    }

    const onChange = (event) => {
        const {target:{value}}=event;
        setNewDisPlayName(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if(user.disPlayName !== newDisPlayName){
            await user.updateProfile({
                disPlayName:newDisPlayName
            })
        }
        refreshUser();
    }

    // 내가 작성한 인스타그램 글만 불러오기
    useEffect(()=>{ 
        let mounted=true;
        if(mounted){
            dbService.collection("posts").where("user","==",user.uid).onSnapshot(snapshot=>{
                const instaArray= snapshot.docs.map(doc=>({
                    ...doc.data(),
                    post_id:doc.id
                }));
                setPostArray(instaArray);
            });
            refreshUser();
        }   
        return () => mounted=false;
    },[]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display name"
                    value={newDisPlayName==null ? "" :newDisPlayName}
                    required
                    onChange={onChange}
                />
                <input 
                    type="submit"
                    value="Update Profile"
                />
            </form>
            <div>
                { 
                    postArray.map(post => (
                        <Instagram
                            key={post.post_id}
                            post={post}
                            isOwner={post.user === user.uid}
                        />
                    ))
                }
            </div>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export default Profile;