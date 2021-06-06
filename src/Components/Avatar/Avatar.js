import React, {useEffect, useState} from "react";
import s from "./Avatar.module.css"
import {useCookies} from "react-cookie";

export default function Avatar() {

    const [profileAva, setProfileAva] = useState();
    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

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
        } else {
            alert("USER NOT FOUND")
        }

        console.log("user ava:" + user.userAvatar)

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

    return (
        <div className="row">
            <div className="col s12">
                <div className="card">
                    <div className="card-image">
                        <div className={s.ava}>
                            <img src={profileAva} alt="..."/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}