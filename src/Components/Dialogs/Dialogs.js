import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import s from "./Dialogs.module.css";
import Dashboard from "../Dashboard/Dashboard";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom"
import AddMessage from "../AddMessage/AddMessage";

export default function Dialogs(props) {

    let {chatId} = useParams();
    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [name, setName] = useState();
    const [messages, setMessages] = useState([])
    const [myId, setMyId] = useState();

    useEffect(() => {
        loadDialog()
        loadMyProfile()
    }, [])

    async function loadMyProfile() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const response = await fetch("http://localhost:8000/api/profile", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let user = await response.json();
            setMyId(user.id)
        } else {
            alert("USER NOT FOUND")
        }

    }

    async function loadDialog() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }


        const response = await fetch("http://localhost:8000/api/dialog/" + chatId, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let data = await response.json();
            setData(data);
        } else {
            alert("Not found chat")
        }
    }

    function setData(data) {
        setMessages(data.messages)
        setName(data.name)
    }

    const [context, setContext] = useState("");

    async function addMessage(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addmessage/" + chatId, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            loadDialog();
            setContext("")
        } else {
            alert("message don add ;c")
        }
    }

    const handleSubmitMessage = event => {
        const message = {context}
        addMessage(message)
        event.preventDefault();
    }


    return (
        <div>
            <Header userOnline={true}/>

            <div className={s.app}>

                <div className="dashboard">
                    <Dashboard/>
                </div>

                <div className="dialog">
                    <div className="row">
                        <div className="col s12">
                            <div className="card" style={{height: '600px'}}>
                                <div className="card-content" style={{height: '530px'}}>

                                    {
                                        messages?.map((m) =>
                                            m.user.id === myId ?
                                                <div className="row">
                                                    <div className="col s6">

                                                    </div>
                                                    <div className="col s6" key={m.id} align="right"
                                                         style={{backgroundColor: "#41CDC1"}}>
                                                        {
                                                            <h6 style={{color: 'white'}}>{m.context}</h6>
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <div key={m.id}>
                                                    <span><strong
                                                        style={{color: 'blue'}}>{m.user.fullName}</strong></span>
                                                    <h6>{m.context}</h6>
                                                </div>
                                        )
                                    }

                                    <div>

                                    </div>

                                </div>
                                <div className="card-action">
                                    {/*<AddMessage chat={chatId}/>*/}
                                    <form>
                                        <div className="row">
                                            <div className="col s10">
                                                <input type="text" value={context}
                                                       onChange={(e) => setContext(e.target.value)}/>
                                            </div>
                                            <div className="col s2">
                                                <button className="btn waves-effect waves-light"
                                                        onClick={handleSubmitMessage} type="button">
                                                    <i className="material-icons">send</i>
                                                </button>
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightSidebar">

                </div>

            </div>
        </div>
    )
}