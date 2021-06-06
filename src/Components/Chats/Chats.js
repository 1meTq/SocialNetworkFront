import React, {useEffect, useState} from "react";
import s from "./Chats.module.css"
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function Chats(props) {


    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [profileAva, setProfileAva] = useState();
    let [myId, setMyId] = useState();


    useEffect(() => {

        loadFriendProfileAvatar()
    }, [])


    async function loadFriendProfileAvatar() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        if (props.users[0].fullName === props.chat.name) {
            const responseAva = await fetch("http://localhost:8000/api/viewavatar/" + props.users[0].userAvatar, {
                method: "get",
                headers: {
                    'Authorization': bearer
                }
            })
            const blob = await responseAva.blob()
            const url = await URL.createObjectURL(blob);
            setProfileAva(url);
            setMyId(props.users[1].id)
        } else {
            console.log(props.users[1])
            const responseAva = await fetch("http://localhost:8000/api/viewavatar/" + props.users[1].userAvatar, {
                method: "get",
                headers: {
                    'Authorization': bearer
                }
            })
            const blob = await responseAva.blob()
            const url = await URL.createObjectURL(blob);
            setProfileAva(url);
            setMyId(props.users[0].id)
        }
    }

    return (
        <Link className="collection-item" to={"/dialogs/" + props.chat.id}>
            <div className={s.chat}>
                <div className={s.postAva}>
                    <img src={profileAva} alt=""/>
                </div>
                <div className="postMessage">
                    <h6 style={{color: "black"}}>{props.chat.name}</h6>
                    <div>{
                        props.chat.messages[props.chat.messages.length - 1].user.id === myId ?
                            <p style={{color:"grey"}}>You : {props.chat.messages[props.chat.messages.length - 1].context}</p>
                            :
                            props.chat.messages[props.chat.messages.length - 1].context
                    }</div>

                </div>
            </div>
        </Link>
    )
}