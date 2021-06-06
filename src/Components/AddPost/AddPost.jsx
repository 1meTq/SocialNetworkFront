import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";

function AddPost(props) {
    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [file, setFile] = useState(null);
    const [context, setContext] = useState("");
    const [postId, setPostId] = useState(0);
    const [postAdded, setPostAdded] = useState(false);
    const [currentDate, setCurrentData] = useState();


    async function addPost(data) {
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/addpost", {
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
        let post;
        if (response.status === 200) {
            // alert("Post added successfull :3")
            post = await response.json();
            setPostId(postId + post.id)

            if (file === null) {
                setPostAdded(true);
            }

        } else {
            alert("Post NOT added ;c")
        }
    }

    function uploadWithFormData() {
        if (postId > 0 && file !== null) {
            const formData = new FormData();
            formData.append("file", file);
            uploadPostPicture(formData)
        }

    }

    async function uploadPostPicture(data) {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        if (file !== null) {
            alert("POST ID:" + postId)
            if (postId !== 0 && postId !== null) {
                const response = await fetch("http://localhost:8000/api/uploadpostpicture/" + postId, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        'Authorization': bearer
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: data
                })

                if (response.status === 200) {
                    // alert("post picture changed!")
                    setFile(null)
                    setPostId(0)
                    setPostAdded(true);
                } else {
                    alert("not picture")
                }
            }
        }


    }

    const handleSubmitPost = event => {
        const date = new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear();
        const post = {context, date}
        addPost(post);
        setContext("")
        event.preventDefault();
    }

    function exit() {
        return <Redirect to="/profiletoprofile"/>
    }

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <div className="row">
                                <div className="col s1">
                                    {
                                        postAdded ? exit() : ""
                                    }

                                    {
                                        postId > 0 ?
                                            file !== null ?
                                                uploadWithFormData()
                                                :
                                                ""
                                            :
                                            ""
                                    }
                                </div>
                                <form className="col s10">
                                    <div className="row">
                                        <div className="input-field">
                                            {/*<i className="material-icons prefix">chat_bubble</i>*/}
                                            <input id="icon_prefix" type="text" value={context}
                                                   onChange={(e) => {
                                                       setContext(e.target.value)
                                                   }} className="validate"/>
                                            <label htmlFor="icon_prefix">New Post</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="file-field input-field">
                                                <div className="btn">
                                                    <span>File</span>
                                                    <input type="file" name="file"
                                                           onChange={(e) => setFile(e.target.files[0])}/>
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate"
                                                           onChange={(e) => setFile(e.target.files[0])}
                                                           type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col s6" style={{paddingTop: '17px'}}>
                                            <button className="btn waves-effect waves-light right" type="button"
                                                    onClick={handleSubmitPost}>Add Post
                                                <i className="material-icons left">chat_bubble</i>
                                            </button>
                                        </div>

                                    </div>


                                </form>
                                <div className="col s1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddPost;