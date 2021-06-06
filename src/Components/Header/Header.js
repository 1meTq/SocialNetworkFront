import React, {useEffect, useState} from "react"
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom"
import {useCookies} from "react-cookie";
import s from "./Header.module.css"


export default function Header(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    const [profileAva, setProfileAva] = useState();
    let [userData, setUserData] = useState([]);

    useEffect(() => {
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

        let user;
        if (response.status === 200) {
            user = await response.json();
            setUserData(user)
        } else {
            // alert("USER NOT FOUND")
        }

        if (user != null) {


            const responseAva = await fetch("http://localhost:8000/api/viewavatar/" + user.userAvatar, {
                method: "get",
                headers: {
                    'Authorization': bearer
                }
            })
            const blob = await responseAva.blob()
            const url = await URL.createObjectURL(blob);
            setProfileAva(url);
        }
    }

    return (
        <nav>
            <div className="nav-wrapper" style={{backgroundColor: "#26a69a"}}>
                <div className="container">
                    <a className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        {
                            props.userOnline ?
                                <div className={s.postAva}>
                                    {/*<li>
                                        <Link to="/profile">
                                            <div className="row">
                                                <div className="col" style={{bottom: '10px'}}>
                                                    <div style={{height: '10px'}}>

                                                    </div>
                                                    <img src={profileAva} alt=""/>
                                                </div>
                                                <div className="col">
                                                    {userData.fullName}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>*/}
                                    <li><Link to="/profile"><img className={s.ava} src={profileAva} alt=""/>{userData.fullName}</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </div>
                                :
                                <div>
                                    <li><Link to="/">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </div>
                        }


                    </ul>
                </div>
            </div>
        </nav>
    )
}

