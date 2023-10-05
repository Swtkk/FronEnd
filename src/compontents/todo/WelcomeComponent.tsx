import {Link, useParams} from "react-router-dom";
import React, {useState} from "react";
import {retrieveHelloWorldBean, retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService";

export default function WelcomeComponent() {
    const {username} = useParams()
    const [message,setMessage] = useState(null)
    function callHelloWorldRestApi(){

        retrieveHelloWorldPathVariable(username)
        .then(response => setMessage(response.data.message))
        .catch(error => console.log(error))

    }

    return (
        <div className={"Welcome container text-center mx-auto"}>
            <h1>Welcome {username}</h1>
            <div>
                Your todos. <Link to={"/todos"}><span className={"text-blue-300"}> Click here </span></Link> to view
                your todos.
            </div>
            <div>
                <button className={"py-5 px-16 mt-10 border-black border-2 rounded-full "} type={"button"}
                         onClick={callHelloWorldRestApi}>Call Hello World
                </button>
            </div>
            <div className={"mt-10"}>{message}</div>
        </div>
    )
}