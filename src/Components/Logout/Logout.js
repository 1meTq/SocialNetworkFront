import React, {useEffect} from "react";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";

export default function Logout() {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

    useEffect(() => {
        exit()
    }, [])

    function exit() {
        removeCookieJWT('jwt');
    }

    return (
        <div>
            <Redirect to="/"/>
        </div>

    )

}