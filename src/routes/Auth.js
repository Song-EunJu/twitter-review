import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [newAccount, setNewAccount]=useState(true);

    const onChange = (event) =>{
        const {target:{name, value}}=event;
        if(name==="email")
            setEmail(value);
        else if(name==="password")
            setPassword(value);
    }

    const changeState = () => setNewAccount(prev => !prev);
    
    return (
        <div>
            <form>
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
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    )
}

export default Auth;
