import React from 'react'
import Header from "../Header/Header";
import s from "./EditProfile.module.css"
import UpdatePicture from "../Update/UpdatePicture/UpdatePicture";
import UpdateProfile from "../Update/UpdateProfile/UpdateProfile";
import UpdatePassword from "../Update/UpdatePassword/UpdatePassword";


export default function EditProfile(props) {


    return (
        <div>
            <Header userOnline={true}/>
            <div style={{padding: '20px'}}>
            </div>
            <div className="container">
                <div className={s.app}>
                    <div>

                    </div>
                    <div>
                        {/* <div>
                            <br/>
                            <h4 align="center"> Update Profile Data</h4>
                            <form onSubmit={handleSubmitProfile} className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <div className={s.forms}>
                                            <div>
                                                <br/>
                                                <i className="material-icons small">email</i>
                                            </div>
                                            <div>
                                                <label>Email</label><br/>
                                                <input id="icon_prefix" value={email} type="email" readOnly/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-field col s12">
                                        <div className={s.forms}>
                                            <div>
                                                <br/>
                                                <i className="material-icons small">account_circle</i>
                                            </div>
                                            <div>
                                                <label>First Name</label><br/>
                                                <input id="icon_prefix" value={fullName}
                                                       onChange={handleChangeFullName} type="text"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div align="right">
                                        <button className="btn waves-effect waves-light" type="submit">Update Profile
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>*/}

                        <UpdateProfile/>

                        <UpdatePicture />

                        <UpdatePassword/>

                    </div>
                    <div>

                    </div>

                </div>
            </div>

        </div>
    )
}
