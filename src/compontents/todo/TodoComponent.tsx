import {Link, useNavigate, useParams} from "react-router-dom";
import {createTodoApi, retrieveTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useEffect, useState} from "react";
import {useAuth} from "./security/AuthContext";
import {Todo} from "../../types";
import {ErrorMessage, Field, Form, Formik, FormikConfig, FormikValues} from "formik";

export default function TodoComponent() {

    const {id} = useParams()
    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username
    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')

    useEffect(() => retrieveTodos(),
        [id])
    function retrieveTodos(){

        // @ts-ignore

        retrieveTodoApi(username,id)
          .then(res => {
                setDescription(res.data.description)
              setTargetDate(res.data.targetDate)
            })
          .catch(err => console.log(err))
    }

    const onSub = (val:any)=>{
        console.log(val)
        const todo = {
            id: id,
            username: username,
            description: val.description,
            targetDate: val.targetDate,
            done: false
        }
        console.log(todo)
        // @ts-ignore
        if(id === -1){
            createTodoApi(username,todo)
                .then(res =>{
                    navigate("/todos")
                })
                .catch(err=> console.log(err))
        }

        updateTodoApi(username,id,todo)
            .then(res =>{
                navigate("/todos")
            })
            .catch(err=> console.log(err))

    }

    // function validate(values:any){
    //     let errors = {
    //         description: '',
    //         targetDate: ''
    //     }
    //     if(values.description.length < 5) {
    //        errors.description = 'Enter atleast 5 characters'
    //     }
    //     if(values.targetDate == null || values.targetDate === ''){
    //         errors.targetDate = 'Enter a target date'
    //     }
    //     return errors
    // }

    return (
        <div className={"container flex flex-col text-center mx-auto items-center justify-center"}>
            <h1 className={"font-bold text-3xl mb-2"}>Enter Todo Detail</h1>
            <div className={"py-10 text-xl container"}>
                <Formik initialValues={{description, targetDate}}
                        onSubmit={onSub}
                        enableReinitialize={true}
                        // validate = {validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                >
                    { (props)=>(
                    <Form>
                        <ErrorMessage
                        name={"description"}
                        component={"div"}
                        className={"text-red-500 font-bold p-2"}
                        />
                        <ErrorMessage
                        name={"targetDate"}
                        component={"div"}
                        className={"text-red-500 font-bold p-2"}
                        />
                  <fieldset className={"flex flex-col justify-center items-center"}>
                      <label className={"py-4"}>Description</label>
                      <Field className={"border-black border-2 w-1/3 p-1"} type={"text"} name={"description"} />
                  </fieldset>
                    <fieldset className={"flex flex-col justify-center items-center"}>
                      <label className={"py-4"}>TargetDate</label>
                      <Field className={"border-black border-2 w-1/3 p-1"} type={"date"} name={"targetDate"} />
                  </fieldset>
                        <div>
                        <button  className={"bg-green-500 mt-5 py-2 px-6 border-black border-2 rounded-xl"} >
                            Save
                        </button>
                        </div>
                    </Form>
                        )
                }
                </Formik>
            </div>
        </div>
    );
}