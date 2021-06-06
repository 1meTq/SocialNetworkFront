import React from "react"
import {Link} from "react-router-dom";

export default function Dashboard(props) {

    return (
        <div className="collection" style={{height: '180px'}}>

            {
                props.page === "profile" ?
                    <Link to="/profile" className="collection-item active"><i
                        className="material-icons left">person</i>Profile</Link>
                    :
                    <Link to="/profile" className="collection-item"><i
                        className="material-icons left">person</i>Profile</Link>
            }

            {
                props.page === "news" ?
                    <Link to="/news" className="collection-item active"><i
                        className="material-icons left">content_copy</i>News</Link>
                    :
                    <Link to="/news" className="collection-item"><i
                        className="material-icons left">content_copy</i>News</Link>
            }

            {
                props.page === "messages" ?
                    <Link to="/messages" className="collection-item active"><i
                        className="material-icons left">chat_bubble_outline
                    </i>Messages</Link>
                    :
                    <Link to="/messages" className="collection-item"><i
                        className="material-icons left">chat_bubble_outline
                    </i>Messages</Link>
            }

            {
                props.page === "friends" ?
                    <Link to="/friends" className="collection-item active"><i
                        className="material-icons left">people</i>Friends</Link>
                    :
                    <Link to="/friends" className="collection-item"><i
                        className="material-icons left">people</i>Friends</Link>
            }

        </div>
    )
}