import React from "react";
import {Link} from "react-router-dom";

export default function RightSidebar(props) {

    return (
        <div className="collection">

            {
                props.page === "search" ?
                    <Link to="/friends/search" className="collection-item active"><i
                        className="material-icons left">search</i>Search</Link>
                    :
                    <Link to="/friends/search" className="collection-item"><i
                        className="material-icons left">search</i>Search</Link>
            }

            {
                props.page === "submitted" ?
                    <Link to="/friends/submitted" className="collection-item active"><i
                        className="material-icons left">assignment_ind</i>Submitted Request</Link>
                    :
                    <Link to="/friends/submitted" className="collection-item"><i
                        className="material-icons left">assignment_ind</i>Submitted Request</Link>
            }

            {
                props.page === "friendrequest" ?
                    <Link to="/friends/friendrequest" className="collection-item active"><i
                        className="material-icons left">contacts</i>
                        Friend requests</Link>
                    :
                    <Link to="/friends/friendrequest" className="collection-item"><i
                        className="material-icons left">contacts</i>
                        Friend requests</Link>
            }


        </div>
    )
}