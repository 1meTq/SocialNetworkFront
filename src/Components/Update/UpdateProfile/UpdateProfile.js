import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import s from "./UpdateProfile.module.css"

export default function UpdateProfile() {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies('jwt');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {

        let bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;

        console.log(bearer)

        const response = await fetch("http://localhost:8000/api/profile", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })

        let user;

        if (response.status === 200) {
            user = await response.json();
            setFullName(user.fullName);
            setEmail(user.email)
        } else {
            alert("USER NOT FOUND")
        }
    }


    async function updateProfile(data) {

        let bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/updateprofile", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            alert("Profile updated successfully!")
        } else {
            alert("Error update Profile")
        }
    }


    // Changes full name
    const handleChangeFullName = event => {
        setFullName(event.target.value)
    }


    // Submits
    const handleSubmitProfile = (event) => {
        const userData = {email, fullName}
        updateProfile(userData);
        event.preventDefault();
    }


    return (
        <div>
            <h4 align="center"> Update Profile Data</h4>
            <form onSubmit={handleSubmitProfile} className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <div className={s.forms}>
                            <div>
                                <br/>
                                <i className="material-icons small">email</i>
                            </div>
                            <div>
                                <label>Email</label><br/>
                                <input id="icon_prefix" value={email} type="email" readOnly/>
                            </div>
                        </div>
                    </div>

                    <div className="input-field col s12">
                        <div className={s.forms}>
                            <div>
                                <br/>
                                <i className="material-icons small">account_circle</i>
                            </div>
                            <div>
                                <label>First Name</label><br/>
                                <input id="icon_prefix" value={fullName}
                                       onChange={handleChangeFullName} type="text"/>
                            </div>
                        </div>
                    </div>

                    <div align="right">
                        <button className="btn waves-effect waves-light" type="submit">Update Profile
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}