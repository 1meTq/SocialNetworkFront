import React, {useState} from "react"
import Header from "../Header/Header";
import s from "./Login.module.css"
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";

export default function Login() {

    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [userOnline, setUserOnline] = useState(false);

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        const inputData = {email, password};
        auth(inputData);
        event.preventDefault();
    }

    async function auth(data) {

        const response = await fetch("http://localhost:8000/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'

            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        })

        let jwt = null;

        if (response.status === 200) {
            jwt = await response.json();
            setCookieJWT('jwt', jwt, {path: "/"})
            setUserOnline(true);
        } else {
            alert("USER NOT FOUND")
        }

    }

    return (
        <div>

            {
                userOnline ?
                    <Redirect to="/profile"/>
                    :
                    <div>
                        <Header userOnline={false}/>
                        <br/>
                        <br/>
                        <h3 align="center">Sign In</h3>

                        <div className="container">
                            <div className={s.app}>
                                <div>

                                </div>
                                <div>
                                    <div className="row">
                                        <form onSubmit={handleSubmit} className="col s12">
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <i className="material-icons prefix">email</i>
                                                    <input id="icon_prefix" type="email" value={email}
                                                           onChange={handleChangeEmail}
                                                           className="validate"/>
                                                    <label htmlFor="icon_prefix">Email</label>
                                                </div>

                                                <div className="input-field col s12">
                                                    <i className="material-icons prefix">lock</i>
                                                    <input id="icon_prefix" type="password" value={password}
                                                           onChange={handleChangePassword} className="validate"/>
                                                    <label htmlFor="icon_prefix">Password</label>
                                                </div>
                                            </div>
                                            <div align="right">
                                                <button className="btn waves-effect waves-light " type="submit"
                                                        name="action">login
                                                    <i className="material-icons right">send</i>
                                                </button>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                                <div>

                                </div>


                            </div>
                        </div>
                    </div>
            }

        </div>

    )
}