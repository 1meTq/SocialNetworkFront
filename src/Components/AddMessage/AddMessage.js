import React, {useState} from "react";
import {useCookies} from "react-cookie";

function AddMessage(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [context, setContext] = useState("");

    async function addMessage(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addmessage/" + props.chat, {
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
            alert("good")
        } else {
            alert("Post NOT added ;c")
        }
    }

    const handleSubmitMessage = event => {
        const message = {context}
        addMessage(message)
        event.preventDefault();
    }


    return (
        <form>
            <div className="row">
                <div className="col s10">
                    <input type="text" value={context} onChange={(e) => setContext(e.target.value)}/>
                </div>
                <div className="col s2">
                    <button className="btn waves-effect waves-light" onClick={handleSubmitMessage} type="button">
                        <i className="material-icons">send</i>
                    </button>
                </div>
            </div>

        </form>
    )
}