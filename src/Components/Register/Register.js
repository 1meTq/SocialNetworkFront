import React, {useState} from "react"
import Header from "../Header/Header";
import s from "./Register.module.css"
import {Redirect} from "react-router-dom";

export default function Register() {

    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [repassword, setRePassword] = useState();
    let [fullName, setFullName] = useState();
    let [registered, setRegistered] = useState(false)

    // const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangeFullName = event => {
        setFullName(event.target.value)
    }

    const handleChangeRePassword = event => {
        setRePassword(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {

        if (password !== repassword) {
            alert("Password and Re-password different!")
        } else {
            const inputData = {email, password, fullName};
            auth(inputData);
        }


        event.preventDefault();
    }

    async function auth(data) {
        const response = await fetch("http://localhost:8000/api/register", {
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

        if (response.status === 200) {
            alert("Registration was successful")
            setRegistered(true)
        } else {
            alert("The user with this email already exists")
        }

    }

    function exit() {
        return <Redirect to="/"/>
    }

    return (
        <div>
            {
                registered ? exit() : " "
            }
            <Header userOnline={false}/>
            <br/>
            <br/>
            <h3 align="center">Sign Up</h3>

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
                                        <input id="icon_prefix" type="email" value={email} onChange={handleChangeEmail}
                                               className="validate" required/>
                                        <label htmlFor="icon_prefix">Email</label>
                                    </div>

                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">lock</i>
                                        <input id="icon_prefix" type="password" value={password}
                                               onChange={handleChangePassword} className="validate" required/>
                                        <label htmlFor="icon_prefix">Password</label>
                                    </div>

                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">lock</i>
                                        <input id="icon_prefix" type="password" value={repassword}
                                               onChange={handleChangeRePassword} className="validate" required/>
                                        <label htmlFor="icon_prefix">Retype Password</label>
                                    </div>

                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">face</i>
                                        <input id="icon_prefix" type="text" value={fullName}
                                               onChange={handleChangeFullName} className="validate" required/>
                                        <label htmlFor="icon_prefix">Full Name</label>
                                    </div>

                                </div>
                                <div align="right">
                                    <button className="btn waves-effect waves-light " type="submit"
                                            name="action">register
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

    )
}