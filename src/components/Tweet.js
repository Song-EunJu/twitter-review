import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Tweet = ({tweet, isOwner}) => {
    const [edit, setEdit]=useState(false);
    const [newTweet, setNewTweet]=useState(tweet.text);

    const deleteTweet = async() => {
        const ok=window.confirm("Are you sure you want to delete tweet?");
        if(ok){
            await dbService.doc(`tweets/${tweet.tweet_id}`).delete();
            if(tweet.url!=="")
                await storageService.refFromURL(`${tweet.url}`).delete();
        }
    }

    const changeToEdit = () => setEdit(prev=>!prev);
    
    const onChange = (event) => {
        const {target:{value}}=event;
        setNewTweet(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweet.tweet_id}`).update({
            text:newTweet
        });
        setEdit(false);
    }

    return (
        <div>
            {
                edit ?  (
                    <div>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="Edit your tweet"
                                value={newTweet}
                                onChange={onChange}
                            />
                            <input type="submit" value="Update Tweet"/>
                        </form>
                        <button onClick={changeToEdit}>Cancel</button>
                    </div>
                ): (
                    <div>
                        <h4>{tweet.text}</h4>
                        { tweet.url && <img src={tweet.url} alt="0" width="150px" height="150px"/> }
                        {
                            isOwner &&  (
                                <>
                                    <button onClick={deleteTweet}>Delete</button>
                                    <button onClick={changeToEdit}>Edit</button>
                                </>
                            ) 
                        }
                    </div>
                )
            }
        </div>
    )
}
export default Tweet;