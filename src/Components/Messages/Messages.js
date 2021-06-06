import React, {useEffect, useState} from 'react'
import s from "./Messages.module.css"
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import Chats from "../Chats/Chats";
import {useCookies} from "react-cookie";

export default function Messages() {

    const [chats, setChats] = useState([])
    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    useEffect(() => {
        loadMyChats()
    }, [])

    async function loadMyChats() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const response = await fetch("http://localhost:8000/api/chats", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })

        let data;
        if (response.status === 200) {
             data = await response.json();
            setChats(data);
        } else {
            alert("Friends Not Found")
        }

        console.log(data)
    }


    return (
        <div>
            <Header userOnline={true}/>

            <div className={s.app}>

                <div className="dashboard">
                    <Dashboard page={"messages"}/>
                </div>

                <div className="messages">

                    {/*<Search/>*/}

                    <div className="collection">
                        {
                            chats?.map((c) =>
                                <Chats chat={c} users={c.participants}/>
                            )
                        }
                    </div>
                </div>

                <div className="rightSidebar">

                </div>

            </div>
        </div>
    )
}