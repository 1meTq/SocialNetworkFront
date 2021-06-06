import React, {useEffect, useState} from 'react'
import s from "./Profile.module.css"
import Header from "../Header/Header";
import {Link, Redirect} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Posts from "../Posts/Posts";
import Description from "../Description/Description";
import Avatar from "../Avatar/Avatar";
import AddPost from "../AddPost/AddPost";
import {useCookies} from "react-cookie";

export default function Profile() {


    let [userOnline, setUserOnline] = useState(true);

    let [posts, setPosts] = useState([]);


    useEffect(() => {
        loadProfile()
        loadMyPosts()
    }, [])

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    let [userData, setUserData] = useState([]);

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
            setUserOnline(false);
        }

    }

    async function loadMyPosts() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }


        const response = await fetch("http://localhost:8000/api/myposts", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let post = await response.json();
            setPosts(post);
        } else {
            alert("USER NOT FOUND")
        }
    }


    return (
        <div>
            {
                userOnline ?
                    <div>
                        <Header userOnline={true}/>
                        <div className={s.app}>
                            <div className="dashboard">
                                <Dashboard page={"profile"}/>
                            </div>

                            <div className="avatar">

                                <Avatar/>

                                <div align="center">
                                    <Link className="btn waves-effect waves-light" to="/editprofile">Edit Profile
                                        <i className="material-icons left">edit</i>
                                    </Link>
                                </div>


                            </div>

                            <div className="posts">

                                <Description fullname={userData.fullName}/>

                                <AddPost/>
                                {
                                    console.log(posts)
                                }
                                {
                                    posts?.map((p) =>
                                        <Posts post={p}/>
                                    )
                                }

                            </div>

                        </div>
                    </div>
                    :
                    <Redirect to="/"/>
            }


        </div>

    )
}