import React, {useEffect, useState} from "react"
import s from "./Friends.module.css"
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import Users from "../Users/Users";
import Search from "../Search/Search";
import {useCookies} from "react-cookie";
import RightSidebar from "./RightSidebar";
import Submitted from "./Submitted/Submitted";
import {useParams} from "react-router-dom"
import FriendRequests from "./FriendRequest/FriendRequests";

export default function Friends(props) {

    let {request} = useParams();

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [friends, setFriends] = useState([]);
    let [userData, setUserData] = useState([]);

    useEffect(() => {
        loadMyFriends()
        loadProfile()
    }, [])


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

        }

    }

    async function loadMyFriends() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const response = await fetch("http://localhost:8000/api/friends", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let data = await response.json();
            setFriends(data);
        } else {
            alert("Friends Not Found")
        }
    }
    return (
        <div>
            <Header userOnline={true}/>
            {
                console.log("userData" + userData)
            }
            <div className={s.app}>

                <div className="dashboard">
                    <Dashboard page={"friends"}/>
                </div>

                {
                    request === "search" ? <Search myid={userData.id}/> : " "
                }

                {
                    request === "friendrequest" ?
                        <FriendRequests reloadFriends={loadMyFriends.bind(loadMyFriends)}/> : " "
                }

                {
                    request === "submitted" ? <Submitted/> : " "
                }

                {
                    props.sidebar === "friends" ?
                        <div className="friends">
                            {
                                friends.length > 0 ?
                                    <div className="collection">
                                        {
                                            friends?.map((f) =>
                                                <Users user={f} friends={true}/>
                                            )
                                        }

                                    </div>
                                    :
                                    <div>
                                        <h3>You don't have friends ;c</h3>
                                    </div>

                            }
                        </div> : " "
                }


                <div className="rightSidebar">
                    <RightSidebar page={props.sidebar}/>
                </div>

            </div>
        </div>
    )
}