import React from "react"
import s from "./Description.module.css"

export default function Description(props) {

    return (
        <div className="row">
            <div className="col s12">
                <div className="card-panel">
                    <h6>{props.fullname}</h6>
                    <hr/>

                    <div className={s.desc}>
                        <div className="descType">
                            Birthdate:<br/>
                            City:<br/>
                            University:<br/>
                        </div>
                        <div className="descContent">
                            06.09.2000<br/>
                            Almaty<br/>
                            IITU<br/>
                        </div>
                    </div>
                    <hr/>

                </div>
            </div>
        </div>
    )
}