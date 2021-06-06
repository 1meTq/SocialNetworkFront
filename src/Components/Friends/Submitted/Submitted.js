import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Users from "../../Users/Users";

export default function Submitted(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [submitted, setSubmitted] = useState([]);

    useEffect(() => {
        loadSubmittedRequest()
    }, [])

    async function loadSubmittedRequest() {

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const response = await fetch("http://localhost:8000/api/getsubmittedrequests", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let data = await response.json();
            setSubmitted(data);
        } else {
            alert("Friends Not Found")
        }
    }

    return (
        <div>
            {
                submitted.length > 0 ?
                    <div className="collection">
                        {
                            submitted?.map((s) =>
                                <Users user={s} submitted={true}/>
                            )
                        }

                    </div>
                    :
                    " "
            }
        </div>
    )
}