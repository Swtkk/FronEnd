import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContext";

export default function LoginComponent() {

    const [username, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState("")
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function passwordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function handleSubmit() {
        if (authContext.login(username,password)) {
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className={"Login container text-center mx-auto"}>
            <h1>Time to Login!</h1>
            <div className={"LoginForm flex flex-col justify-center items-center"}>
                <div className={"flex justify-center items-center"}>
                    <label className={"p-3"}>User Name:</label>
                    <input className="border-4 border-black rounded-2xl m-4 px-3 py-2" type={"text"} name={"username"}
                           value={username} onChange={handleUsernameChange}/>
                </div>
                <div className={"flex justify-center items-center "}>
                    <label className={"p-3"}>Password:</label>
                    <input className={"border-4 border-black rounded-2xl m-4 px-3 py-2"} type={"password"}
                           name={"password"} value={password} onChange={passwordChange}/>
                </div>
                <div>
                    <button className={"py-5 px-20 border-black border-2 rounded-full"} type={"button"}
                            name={"login"} onClick={handleSubmit}>Login
                    </button>
                </div>
                {showErrorMessage ?
                    <div className={"errorMessage"}>Authentication Failed. Please check your credentials.</div> : null}
            </div>
        </div>
    );
}