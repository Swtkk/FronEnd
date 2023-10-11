import React, {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllTodosForUsername} from "./api/TodoApiService";
import {Todo} from "../../types";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

export default function ListTodosComponent() {
    // const today = new Date()
    // const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDay())

    const authContext = useAuth()

    const username = authContext.username
    const [todos, setTodos] = useState<Todo[]>([])
    const [message, setMessage] = useState(String)
    const navigate = useNavigate()

    useEffect(() => refreshTodos(),[])

    function refreshTodos() {
        retrieveAllTodosForUsername(username)
            .then(res => {
                setTodos(res.data)
            })
            .catch(err => console.log(err))
    }

    function deleteTodo(id:number){
        deleteTodoApi(username,id)
            .then(
                ()=>{
                    setMessage(`Todo with id ${id} has been deleted!`)
                    refreshTodos()
                }

            )
            .catch()
    }
    function updateTodo(id:number){
        navigate(`/todo/${id}`)
    }
    function addNewTodo(){
        navigate(`/todo/-1`)
    }


    return (
        <div className={"ListTodosComponent container mx-auto flex flex-col justify-center items-center"}>
            <h1>List of todos</h1>
            {message && <div className={"text-center p-5"}>{message}</div>}
            <div className={"container"}>
                <table className={"table-auto container text-center "}>
                    <thead>
                    <tr className={"bg-gray-500/50"}>
                        <th className={" border border-slate-600 py-5"}>Description</th>
                        <th className={"border border-slate-600"}>Is Done?</th>
                        <th className={"border border-slate-600"}>Target Date</th>
                        <th className={"border border-slate-600"}>Delete</th>
                        <th className={"border border-slate-600"}>Update</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        todos.map(todo => (
                            <tr className={"bg-gray-300/40"} key={todo.id}>
                                <td className={" border border-slate-600 py-5"}>{todo.description}</td>
                                <td className={"border border-slate-600"}>{todo.done.toString()}</td>
                                <td className={"border border-slate-600"}>{todo.targetDate.toString()} </td>
                                <td className={"border border-slate-600"}>
                                    <button className={"py-2 px-6 border-black border-2 rounded-xl bg-amber-500"} onClick={()=>deleteTodo(todo.id)}>Delete</button>
                                </td>
                                <td className={"border border-slate-600"}>
                                    <button className={"py-2 px-6 border-black border-2 rounded-xl bg-green-600/90"} onClick={()=>updateTodo(todo.id)}>Update</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <button className={"py-2 px-6 border-black border-2 rounded-xl bg-green-600/90 mt-10"} onClick={addNewTodo}>Add New Todo</button>
        </div>
    )
}