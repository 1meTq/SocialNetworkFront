import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import Users from "../../Users/Users";

export default function FriendRequests(props) {

    useEffect(() => {
        loadFriendRequests()
    }, [])

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [requests, setRequests] = useState([]);


    async function loadFriendRequests() {

        setRequests([]);
        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const response = await fetch("http://localhost:8000/api/getfriendrequest", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let data = await response.json();
            setRequests(data);
        } else {
            alert("Friends Not Found")
        }
    }

    return (
        <div>
            {
                requests.length > 0 ?
                    <div className="collection">
                        {
                            requests?.map((s) =>
                                <Users user={s} requests={true} reloadFriends={props.reloadFriends}
                                       reloadRequests={loadFriendRequests}/>
                            )
                        }

                    </div>
                    :
                    " "
            }
        </div>
    )
}