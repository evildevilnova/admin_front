import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const Modale = (props) => {
    return (
        <>
            <Modal size={props.size} show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.body}
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        props.buttons ? props.buttons.map((btn, index) =>
                            <Button key={index} variant={btn.color} onClick={btn.onClick}>
                                {btn.label}
                            </Button>
                        ) :
                            <Button variant="primary" onClick={props.savebtn}>
                                Save Changes
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Modale;
