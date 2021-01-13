import React, {useEffect, useState} from "react";
import Instagram from "../components/Instagram";
import { authService, dbService } from "../fbase";

const Profile = ({userObj, refreshUser}) => {
    const [newDisPlayName,setNewDisPlayName]=useState(userObj.displayName);
    const [postArray, setPostArray] =useState([]);
    const [rawPhoto, setRawPhoto] = useState("");

    const logOut = () => {
        authService.signOut();
    }

    const onChange = (event) => {
        const {target:{value}}=event;
        setNewDisPlayName(value);
    }


    // 프로필 이름 업데이트
    const onProfileSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisPlayName){
            await userObj.updateProfile({
                displayName:newDisPlayName,
            })
        }
        refreshUser();
    }

    // 프로필 사진 업데이트
    const onPhotoSumit = async(event) => {
        event.preventDefault();
        
    }

    const fileReader = (event) => {
        const {target:{files}} = event;
        const theFile = files[0]; // 1. 파일을 받아옴
        const reader = new FileReader();

        if(theFile){
            reader.onloadend = (finished) => {
                const {target:{result}} = finished;
                setRawPhoto(result);
            }
            reader.readAsDataURL(theFile); // 2. 파일을 dataUrl 형태로 읽기
        }
    }

    // 내가 작성한 인스타그램 글만 불러오기
    useEffect(()=>{ 
        let mounted=true;
        if(mounted){
            dbService.collection("posts").where("user","==",userObj.uid).onSnapshot(snapshot=>{
                const instaArray= snapshot.docs.map(doc => ({
                    ...doc.data(),
                    post_id:doc.id
                }));
                setPostArray(instaArray);
            });
            refreshUser();
        }   
        return () => mounted=false;
    },[refreshUser,userObj.uid]);

    return (
        <>
            <form onSubmit={onProfileSubmit}>
                <input
                    type="text"
                    placeholder="Display name"
                    value={newDisPlayName==null ? "" : newDisPlayName}
                    autoFocus
                    onChange={onChange}
                />
                <input 
                    type="submit"
                    value="Update Profile"
                />
            </form>

            <form onSubmit={onPhotoSumit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={fileReader}
                />
            </form>

            <div>
                { 
                    postArray.map(post => (
                        <Instagram
                            key={post.post_id}
                            post={post}
                            isOwner={post.user === userObj.uid}
                        />
                    ))
                }
            </div>
            <button onClick={logOut}>Log Out</button>
        </>
    )
}

export default Profile;