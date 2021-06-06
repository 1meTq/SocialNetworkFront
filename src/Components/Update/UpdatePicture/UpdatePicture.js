import React, {useEffect, useState} from 'react'
import {useCookies} from "react-cookie";

export default function UpdatePicture(props) {

    const [file, setFile] = useState(null);
    const [userData, setUserData] = useState([]);
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

        let user
        if (response.status === 200) {
            user = await response.json();
            setUserData(user);
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


    async function uploadFile(data) {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }
        const response = await fetch("http://localhost:8000/api/uploadavatar", {
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
            alert("Avatar changed!")
        } else {
            alert("USER NOT FOUND")
        }
    }

    function uploadWithFormData() {
        const formData = new FormData();
        formData.append("file", file);
        uploadFile(formData)
    }

    return (
        <div>

            <div>
                <br/>
                <h4 align="center"> Update Profile Picture</h4>
                <form className="col s12">
                    <div className="row">

                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" onChange={(e) => setFile(e.target.files[0])}
                                       type="text"/>
                            </div>
                        </div>

                        <div align="right">
                            <button className="btn waves-effect waves-light" type="button"
                                    onClick={uploadWithFormData}>Update Profile Picture
                                <i className="material-icons right">send</i>
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    )

}