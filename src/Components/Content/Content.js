import React from "react"
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from "react-router-dom"
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import News from "../News/News";
import Messages from "../Messages/Messages";
import Friends from "../Friends/Friends";
import EditProfile from "../EditProfile/EditProfile";
import UpdatePicture from "../Update/UpdatePicture/UpdatePicture";
import Logout from "../Logout/Logout";
import ProfileToProfile from "../ProfileToProfile/ProfileToProfile";
import Dialogs from "../Dialogs/Dialogs";

export default function Content(props) {

    return (
        <div>

            <Switch>
                <Route exact path="/" render={() => <Login/>}/>
                <Route exact path="/register" render={() => <Register/>}/>
                <Route exact path="/profile" render={() => <Profile/>}/>
                <Route exact path="/news" render={() => <News/>}/>
                <Route exact path="/messages" render={() => <Messages/>}/>

                <Route exact path="/friends" render={() => <Friends sidebar={"friends"}/>}/>

                <Route exact path="/friends/:request" render={() => <Friends/>}/>

                <Route exact path="/editprofile" render={() => <EditProfile/>}/>
                <Route exact path="/update" render={() => <UpdatePicture/>}/>
                <Route exact path="/logout" render={() => <Logout/>}/>

                <Route exact path="/profiletoprofile" render={() => <ProfileToProfile/>}/>
                <Route exact path="/dialogs/:chatId" render={() => <Dialogs/>}/>
            </Switch>

        </div>
    )
}