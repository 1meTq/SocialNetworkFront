import React, {useEffect, useState} from 'react'
import s from "./Posts.module.css"
import {useCookies} from "react-cookie";
import AddComment from "../AddComment/AddComment";
import Likes from "../Likes/Likes";


export default function (props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [postPicture, setPostPicture] = useState();
    const [profileAva, setProfileAva] = useState();
    const [comment, setComment] = useState(false)


    useEffect(() => {
        getPostPicture()
        getUserAva()
        recordUsersAva()
        loadPostLikes()
    }, [])

    async function getPostPicture() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const responseAva = await fetch("http://localhost:8000/api/viewpostpicture/" + props.post.picture, {
            method: "get",
            headers: {
                'Authorization': bearer
            }
        })
        const blob = await responseAva.blob()
        const url = await URL.createObjectURL(blob);
        setPostPicture(url);
    }

    async function getUserAva() {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        // console.log(props.post.author)
        const responseAva = await fetch("http://localhost:8000/api/viewavatar/" + props.post.author.userAvatar, {
            method: "get",
            headers: {
                'Authorization': bearer
            }
        })
        const blob = await responseAva.blob()
        const url = await URL.createObjectURL(blob);
        setProfileAva(url);
    }

    const reload = () => {
        props.reload();
        recordUsersAva()
    }

    const [likes, setLikes] = useState([]);

    async function loadPostLikes() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }


        const response = await fetch("http://localhost:8000/api/getlikes/" + props.post.id, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let like = await response.json();
            setLikes(like);
        } else {
            alert("USER NOT FOUND")
        }
    }

    async function recordUsersAva() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        for (let i = 0; i < props.post.comments.length; i++) {
            const responseAva = await fetch("http://localhost:8000/api/viewavatar/" + props.post.comments[i].user.userAvatar, {
                method: "get",
                headers: {
                    'Authorization': bearer
                }
            })
            const blob = await responseAva.blob()
            const url = await URL.createObjectURL(blob);

            props.post.comments[i].user.userAvatar = url;
        }

    }

    const viewComments = () => {
        setComment(!comment);
    }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card-panel">
                    <div className={s.topSide}>
                        <div className={s.postAva}>
                            <img src={profileAva} alt=""/>
                        </div>
                        <div>
                            <h6>{props.post.author.fullName}</h6>
                            <span style={{fontSize: "75%", color: "grey"}}>{props.post.date}</span>
                        </div>
                    </div>
                    <div style={{padding: "1em"}}>
                        {props.post.context}
                    </div>

                    <div className="card-image" style={{padding: "1em"}}>
                        <img src={postPicture} alt=""/>
                    </div>

                    <div>
                        <hr/>
                    </div>

                    <div className={s.lowerPart}>
                        <div>

                            <Likes likes={likes} reload={loadPostLikes} postId={props.post.id}/>

                        </div>
                        <div>
                            <a style={{color: "black"}} onClick={viewComments}>
                                <i className="material-icons left">chat_bubble_outline</i>{props.post.comments.length}
                            </a>
                        </div>

                        <div>
                            <i className="material-icons left">redo</i>
                        </div>

                    </div>

                    {
                        comment ? <AddComment reload={reload} comments={props.post.comments}
                                              postId={props.post.id}/>
                            : " "
                    }


                </div>

            </div>
        </div>
    )
}