import React, {useEffect, useState} from "react";
import s from "./Users.module.css"
import {useCookies} from "react-cookie";
import Modal from "../Modal/Modal";


export default function Users(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [profileAva, setProfileAva] = useState();
    let [send, setSend] = useState(false);
    let [message, setMessage] = useState("")


    useEffect(() => {
        loadProfile()
    }, [])


    async function loadProfile() {

        debugger
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }


        const responseAva = await fetch("http://localhost:8000/api/viewavatar/" + props.user.userAvatar, {
            method: "get",
            headers: {
                'Authorization': bearer
            }
        })
        const blob = await responseAva.blob()
        const url = await URL.createObjectURL(blob);
        setProfileAva(url);

    }

    const handleSubmitMessage = (e) => {
        const mess = {context: message}
        addChat(mess)
        e.preventDefault();
    }

    async function addChat(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addchat/" + props.user.id, {
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
            setMessage("")
            setSend(false)
        } else {
            alert("message don add ;c")
        }
    }

    async function sendRequest(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addfriendship", {
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

        } else {
            alert("message don add ;c")
        }
    }

    const handleRequestFriend = (e) => {

        sendRequest(props.user.id);
        e.preventDefault()
    }

    const handleDoneFriend = (e) => {

        addFriend(props.user.friendship)
        e.preventDefault()
    }

    async function addFriend(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addfriend", {
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
            props.reloadRequests();
            props.reloadFriends()
        } else {
            alert("Friend dont addedd ;c")
        }
    }

    async function deleteRequest(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/deleterequest", {
            method: "DELETE",
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
            props.reloadRequests();
            props.reloadFriends()
        } else {
        }
    }


    const handleCancelFriend = (e) => {

        deleteRequest(props.user.friendship)
        e.preventDefault()
    }


    return (
        <div className="collection-item">
            <div className={s.friendDescription}>
                <div className={s.friendAva}>
                    <img src={profileAva} alt=""/>
                </div>
                <div>
                    <form>
                        <h6 style={{color: 'black', position: "relative", left: "10px"}}>{props.user.fullName}

                            {
                                props.requests ?
                                    <span style={{fontSize: "70%", position: "relative", left: "10px", color: "gray"}}
                                          className="small">wants to be your friend</span>
                                    :
                                    " "
                            }

                            {
                                props.submitted ?
                                    <span className="badge">Request submitted<i
                                        style={{position: "relative", left: "10px", top: "3px"}}
                                        className="material-icons grey-text">call_made</i></span>
                                    :
                                    " "
                            }

                            {
                                props.friends ? <i style={{position: "relative", left: "10px", top: "3px"}}
                                                   className="material-icons grey-text">done</i> : " "
                            }

                            {
                                props.search ?
                                    props.user.friend ? <i style={{position: "relative", left: "10px", top: "3px"}}
                                                           className="material-icons grey-text">done</i> :
                                        <a onClick={handleRequestFriend}
                                           style={{position: "relative", left: "10px", bottom: "5px"}}
                                           className="btn-floating btn-small waves-effect waves-light green"><i
                                            className="material-icons">add_circle</i></a>
                                    :
                                    " "
                            }


                        </h6>
                    </form>

                    {/*<a style={{width:"30px"}} className="close"><i*/}
                    {/*    className="material-icons">cancel</i></a>*/}
                    {/*<span style={{color: 'gray'}}> </span>*/}
                    {/*<br/>*/}
                    {/*<a className="waves-effect waves-teal btn-flat"><span style={{color: 'blue'}}>Send Message</span></a>*/}
                    {
                    }
                    {/*<Modal id={props.user.id} fullName={props.user.fullName} avatar={profileAva}/>*/}
                    {
                        send ?
                            <form onSubmit={handleSubmitMessage}>
                                <input style={{width: "370px"}} type="text" value={message} onChange={(e) => {
                                    setMessage(e.target.value)
                                }}/>
                                <button style={{left: "20px"}} className="btn waves-effect waves-light"
                                        onClick={handleSubmitMessage} type="button">
                                    <i className="material-icons">send</i>
                                </button>
                            </form>
                            :
                            <div>
                                <a className="waves-effect waves-teal btn-flat" onClick={(e) => {
                                    setSend(true)
                                }}><span
                                    style={{color: 'blue'}}>Send Message</span></a>

                                {
                                    props.requests ? <a onClick={handleDoneFriend}
                                                        style={{position: "relative", left: "80px", bottom: "5px"}}
                                                        className="btn-floating btn-small waves-effect waves-light green"><i
                                        className="material-icons">done</i></a> : " "
                                }

                                {
                                    props.requests ? <a onClick={handleCancelFriend}
                                                        style={{position: "relative", left: "100px", bottom: "5px"}}
                                                        className="btn-floating btn-small waves-effect waves-light red"><i
                                        className="material-icons">cancel</i></a> : " "
                                }

                            </div>

                    }

                </div>
            </div>
        </div>
    )
}