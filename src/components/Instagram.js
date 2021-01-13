import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Instagram = ({post, isOwner}) => {
    const [edit, setEdit]=useState(false);
    const [newPost, setNewPost]=useState(post.text);

    const deletePost = async() => {
        const ok=window.confirm("Are you sure you want to delete post?");
        if(ok){
            await dbService.doc(`posts/${post.post_id}`).delete();
            if(post.url!=="")
                await storageService.refFromURL(`${post.url}`).delete();
        }
    }

    const changeToEdit = () => setEdit(prev=>!prev);
    
    const onChange = (event) => {
        const {target:{value}}=event;
        setNewPost(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.doc(`posts/${post.post_id}`).update({
            text:newPost
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
                                placeholder="Edit your post"
                                value={newPost}
                                onChange={onChange}
                            />
                            <input type="submit" value="Update Post"/>
                        </form>
                        <button onClick={changeToEdit}>Cancel</button>
                    </div>
                ): (
                    <div>
                        <h4>{post.text}</h4>
                        { post.url && <img src={post.url} alt="0" width="150px" height="150px"/> }
                        {
                            isOwner &&  (
                                <>
                                    <button onClick={deletePost}>Delete</button>
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
export default Instagram;