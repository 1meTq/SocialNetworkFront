import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export default function Likes(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    let [userData, setUserData] = useState([]);
    let [postLiked, setPostLiked] = useState(false);
    let [check, setCheck] = useState(false);


    useEffect(() => {
        checkMyLike()
    }, [])

    const checkMyLike = () => {
        loadProfile();
    }

    function isItMyLike() {

        for (let i = 0; i < props.likes.length; i++) {
            if (props.likes[i].user.id === userData.id) {
                setPostLiked(true)
                break;
            }
        }
        setCheck(true);
    }

    async function loadProfile() {

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
            setUserData(user);
        } else {
            alert("USER NOT FOUND")
        }

    }


    const handleDeleteLike = (e) => {


        for (let i = 0; i < props.likes.length; i++) {
            if (props.likes[i].user.id === userData.id && props.likes[i].post.id === props.postId) {
                const like = props.likes[i];
                deleteLike(like)
                break;
            }
        }

        e.preventDefault();
    }

    async function deleteLike(like) {
        debugger
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/deletelike/" + like.id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        })
        setCheck(false)
        setPostLiked(false)
        props.reload();
    }

    const handleAddLike = (e) => {


        const like = {user: {id: userData.id}, post: {id: props.postId}}
        addLike(like);
        e.preventDefault();
    }

    async function addLike(like) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addlike", {
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
            body: JSON.stringify(like)
        })

        setCheck(false)
        props.reload();
    }


    return (
        <div>
            {
                props.likes.length > 0 && check === false ? isItMyLike() : " "
            }
            {
                postLiked ?
                    <a style={{color: "red"}} onClick={handleDeleteLike}>
                        <i className="material-icons left red-text">favorite</i>{props.likes.length}
                    </a>
                    :
                    <a style={{color: "black"}} onClick={handleAddLike}>
                        <i className="material-icons left">favorite_border</i>{props.likes.length}
                    </a>
            }
        </div>)
}