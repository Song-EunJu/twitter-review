import React, {useEffect, useState} from "react";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "../fbase";

const Home = ({user}) => {
    const [tweet, setTweet]=useState("");
    const [tweets, setTweets]=useState([]);
    const [file, setFile]=useState("");

    const onChange = (event) => {
        const {target:{value}}=event;
        setTweet(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        let url="";
        if(file!==""){
            const fileRef = storageService.ref().child(`${user.uid}/${uuidv4()}`);
            await fileRef.putString(file, "data_url");
            url = await fileRef.getDownloadURL();
        }
        await dbService.collection("tweets").add({
            createdAt:Date.now(),
            text:tweet,
            user:user.uid,
            url
        })
        setTweet("");
        setFile("");
    }

    useEffect(()=>{
        dbService.collection("tweets").orderBy("createdAt","desc").onSnapshot(snapshot=> {
            const tweetArray=snapshot.docs.map(doc => ({
                ...doc.data(),
                tweet_id:doc.id    
            }))
            setTweets(tweetArray);
        })
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
                    value={tweet}
                    required
                    onChange={onChange}
                />
                <input type="submit" value="Tweet"/>
                <input type="file" accept="image/*" onChange={attachFile}/>

            </form>
            { file && <img src={file} alt="0" width="150px" height="150px"/> }
            <button onClick={clearFile}>Clear</button>

            { 
                tweets.map(tweet => (
                    <Tweet 
                        key={tweet.tweet_id}
                        tweet={tweet}
                        isOwner={tweet.user === user.uid}
                    />
                ))
            }
        </>
    )
}

export default Home;
