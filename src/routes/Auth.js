import React, {useState} from "react";
import {authService, fbInstance} from "../fbase";

const Auth = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [newAccount, setNewAccount]=useState(true);
    const [error, setError]=useState("");

    const onChange = (event) =>{
        const {target:{name, value}}=event;
        if(name==="email")
            setEmail(value);
        else if(name==="password")
            setPassword(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            if(newAccount){
                await authService.createUserWithEmailAndPassword(email, password);
            }
            else{
                await authService.signInWithEmailAndPassword(email, password);
            }
        }catch(error){
            setError(error.message);
        }
    }

    const changeState = () => setNewAccount(prev => !prev);
    
    const socialLogin = async(event) => {
        const {target:{name}}=event;
        let provider;
        if(name==="Google"){
            provider=new fbInstance.auth.GoogleAuthProvider();
        }
        else if(name==="Github"){
            provider=new fbInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    required
                    onChange={onChange}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    required
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
                <span onClick={changeState}>{newAccount ? "Sign In" : "Create Account"}</span>
            </form>
            {error}
            <div>
                <button onClick={socialLogin} name="Google">Continue with Google</button>
                <button onClick={socialLogin} name="Github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;
