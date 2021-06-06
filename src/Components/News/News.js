import React, {useEffect, useState} from 'react'
import Header from "../Header/Header";
import s from "./News.module.css"
import Dashboard from "../Dashboard/Dashboard";
import Posts from "../Posts/Posts";
import AddPost from "../AddPost/AddPost";
import {useCookies} from "react-cookie";


export default function News() {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    let [posts, setPosts] = useState([]);
    let [viewCom, setViewCom] = useState(false);


    const reload = () => {
        setViewCom(true)
        loadAllPosts()
    }

    async function loadAllPosts() {

        setPosts([])
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }


        const response = await fetch("http://localhost:8000/api/allposts", {
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
            alert("All posts not found")
        }
    }

    useEffect(() => {
        loadAllPosts()
    }, [])


    return (
        <div>
            <Header userOnline={true}/>

            <div className={s.app}>

                <div className="dashboard">
                    <Dashboard page={"news"}/>
                </div>

                <div className="posts">

                    {/*<AddPost/>*/}


                    {
                        posts?.map((p) =>
                            <div key={p.id}>
                                <Posts viewCom={viewCom} updateCom={() => {
                                    setViewCom(false)
                                }} reload={reload} post={p}/>
                            </div>
                        )
                    }


                </div>

                <div className="rightSidebar">

                </div>

            </div>
        </div>
    )
}