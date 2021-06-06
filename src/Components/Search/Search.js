import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import Users from "../Users/Users";

function Search(props) {

    const [cookiesJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    let [name, setName] = useState("");
    let [users, setUsers] = useState([])


    const handleChangeName = (e) => {
        setName(e.target.value)
        if (e.target.value !== "" && e.target.value !== null) {
            loadUsers(e.target.value)
        }

        e.preventDefault();
    }


    async function loadUsers(fullname) {

        setUsers([])

        let bearer = "no";

        if (cookiesJWT['jwt'] != null) {
            bearer = "Bearer " + cookiesJWT['jwt'].jwtToken;
        }

        const response = await fetch("http://localhost:8000/api/search/" + fullname, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        })


        if (response.status === 200) {
            let data = await response.json();
            setUsers(data);
            console.log(users)
        } else {
            alert("Friends Not Found")
        }

    }


    return (
        <div className="col s12">
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="input-field">
                            <i className="material-icons prefix">search</i>
                            <input id="icon_prefix" type="text" value={name} onChange={handleChangeName}
                                   className="validate"/>
                            <label htmlFor="icon_prefix">Search</label>
                        </div>

                        {
                            users.length > 0 ?
                                <div className="collection">
                                    {
                                        users?.map((u) =>
                                            u.id === props.myid ? "" : <Users user={u} search={true}/>
                                        )
                                    }

                                </div>
                                :
                                " "
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Search;