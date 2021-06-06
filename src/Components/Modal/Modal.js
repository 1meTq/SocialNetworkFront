import React, {Component, useState} from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import s from "./Modal.module.css";

class Modal extends Component {


    constructor(props) {
        super(props);
        this.state = {fullName: "QWERTY"};
        this.state = {avatar: props.avatar};
        this.state = {id: props.id};

    }

    componentDidMount() {
        const options = {
            onOpenStart: () => {
                console.log("Open Start");
            },
            onOpenEnd: () => {
                console.log("Open End");
            },
            onCloseStart: () => {
                console.log("Close Start");
            },
            onCloseEnd: () => {
                console.log("Close End");
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);

        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();
        // instance.destroy();
    }


    render() {
        return (
            <div>
                {/*<a className="waves-effect waves-light btn modal-trigger" data-target="modal1">
                    Modal
                </a>*/}
                <a className="waves-effect waves-teal btn-flat btn modal-trigger" data-target="modal1"><span
                    style={{color: 'blue'}}>Send Message</span></a>
                <p>{console.log("STATE: " + this.state.fullName)}</p>

                <div ref={Modal => {
                    this.Modal = Modal;
                }} id="modal1" className="modal">
                    <div className="modal-content">
                        <h4><img className={s.ava} src={this.props.avatar} alt=""/>{this.state.fullName}</h4>
                        <p>a</p>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-red btn-flat red-text">
                            Back
                        </a>
                        <a className="modal-close waves-effect waves-green btn-flat green-text">
                            Send
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
