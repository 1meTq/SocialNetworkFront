import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import s from "./AddComment.module.css"

export default function AddComment(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [context, setContext] = useState("");
    const [profileAva, setProfileAva] = useState("");

    async function addComment(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addcomment/" + props.postId, {
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
            props.reload();
        } else {
            alert("Comment dont added ;c")
        }
    }

    const handleSubmitComment = event => {
        const comment = context;
        const data = {comment}
        addComment(data)
        event.preventDefault();
    }


    return (
        <div>
            <div style={{padding: "1em"}}>
                <form>
                    <div className="row">
                        <div className="col s10">
                            <input type="text" value={context} onChange={(e) => setContext(e.target.value)}/>
                        </div>
                        <div className="col s2">
                            <button className="btn waves-effect waves-light" onClick={handleSubmitComment}
                                    type="button">
                                <i className="material-icons">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="comments">
                {/*<div key={c.id}>
                    <div className={s.app}>
                        <div className={s.commentAva}>
                            <img src={c.user.userAvatar} alt="..."/>
                        </div>
                        <div>
                            <h6>{c.user.fullName}</h6>
                            <h6 style={{fontSize: "80%"}}>{c.comment}</h6>
                        </div>
                    </div>
                    <br/>
                </div>*/}
                {
                    props.comments?.map((c) => (
                            <div className="card horizontal">

                                <div className="card-stacked">
                                    <div className="card-content">

                                        <div className={s.app}>
                                            <div className={s.commentAva}>
                                                <img src={c.user.userAvatar} alt="..."/>
                                            </div>
                                            <div>
                                                <h6>{c.user.fullName}</h6>
                                                <h6 style={{fontSize: "80%"}}>{c.comment}</h6>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )
                    )
                }
            </div>

        </div>

    )
}