import React, {useEffect, useState} from "react"
import {useCookies} from "react-cookie";
import s from "./UpdatePassword.module.css"

export default function UpdatePassword() {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies('jwt');
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");


    async function updatePassword(data) {
        let bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/updatepassword", {
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
            alert("PASSWORD updated successfully!")
        } else {
            alert("Error update PASSWORD")
        }
    }


    //Changes password
    const handleChangeOldPassword = event => {
        setOldPassword(event.target.value)
    }

    const handleChangeNewPassword = event => {
        setNewPassword(event.target.value)
    }

    const handleChangeReNewPassword = event => {
        setReNewPassword(event.target.value)
    }


    const handleSubmitPassword = (event) => {

        if (newPassword !== reNewPassword) {
            alert("Bad Request! New and Retype New passwords are different!")
        } else {
            const userPasswordDTO = {oldPassword, newPassword}
            updatePassword(userPasswordDTO);
        }
        event.preventDefault();
    }


    return (

        <div>
            <br/>
            <h4 align="center"> Update Profile Password</h4>
            <form onSubmit={handleSubmitPassword} className="col s12">
                <div className="row">

                    <div className="input-field col s12">
                        <div className={s.forms}>
                            <div>
                                <br/>
                                <i className="material-icons small">lock</i>
                            </div>
                            <div>
                                <label>Old Password</label><br/>
                                <input id="icon_prefix" value={oldPassword}
                                       onChange={handleChangeOldPassword} type="password"/>
                            </div>
                        </div>
                    </div>

                    <div className="input-field col s12">
                        <div className={s.forms}>
                            <div>
                                <br/>
                                <i className="material-icons small">lock</i>
                            </div>
                            <div>
                                <label>New Password</label><br/>
                                <input id="icon_prefix" value={newPassword}
                                       onChange={handleChangeNewPassword} type="password"/>
                            </div>
                        </div>
                    </div>

                    <div className="input-field col s12">
                        <div className={s.forms}>
                            <div>
                                <br/>
                                <i className="material-icons small">lock</i>
                            </div>
                            <div>
                                <label>Retype New Password</label><br/>
                                <input id="icon_prefix" value={reNewPassword}
                                       onChange={handleChangeReNewPassword} type="password"/>
                            </div>
                        </div>
                    </div>

                    <div align="right">
                        <button className="btn waves-effect waves-light" type="submit">Update Password
                            <i className="material-icons right">send</i>
                        </button>
                    </div>

                </div>
            </form>
        </div>

    )
}