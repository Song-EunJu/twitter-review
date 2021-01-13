import React, {useEffect, useState} from "react";
import Instagram from "../components/Instagram";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "../fbase";

const Home = ({userObj}) => {
    const [post, setPost]=useState("");
    const [posts, setPosts]=useState([]);
    const [file, setFile]=useState("");

    const onChange = (event) => {
        const {target:{value}}=event;
        setPost(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        let url="";
        if(file!==""){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            await fileRef.putString(file, "data_url");
            url = await fileRef.getDownloadURL();
        }
        await dbService.collection("posts").add({
            createdAt:Date.now(),
            text:post,
            user:userObj.uid,
            url
        })
        setPost("");
        setFile("");
    }

    useEffect(()=>{
        let mounted=true;
        if(mounted){
            dbService.collection("posts").orderBy("createdAt","desc").onSnapshot(snapshot=> {
                const instaArray=snapshot.docs.map(doc => ({
                    ...doc.data(),
                    post_id:doc.id    
                }))
                setPosts(instaArray);
            })
        }
        return () => mounted=false;
    },[]);

    const attachFile = (event) => {
        const {target:{files}}=event;
        const theFile = files[0];
        const reader = new FileReader(); // 1.파일리더 선언 후
        reader.onloadend = (event) =>{ // 3. 로드 끝나면 url 받기
            const {currentTarget:{result}} = event;
            setFile(result);
        }
        if(theFile)
            reader.readAsDataURL(theFile); // 2. url로 변경하면서 읽고
    }

    const clearFile = () => {        
        setFile("");
    }

    return (
        <>
            <form onSubmit={onSubmit}> 
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={post}
                    required
                    onChange={onChange}
                />
                <input type="submit" value="Post"/>
                <input type="file" accept="image/*" onChange={attachFile}/>

            </form>
            { file && <img src={file} alt="0" width="150px" height="150px"/> }
            <button onClick={clearFile}>Clear</button>

            { 
                posts.map(post => (
                    <Instagram
                        key={post.post_id}
                        post={post}
                        isOwner={post.user === userObj.uid}
                    />
                ))
            }
        </>
    )
}

export default Home;
