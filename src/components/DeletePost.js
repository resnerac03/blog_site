import React, {useState, useEffect} from 'react'
import fb from './../config/firebase';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';

const  DeletePost = (props) => {

    const deletePost = async (id) => {
        await fb.database().ref('posts/' + id).remove().then(props.closeDeleteBox)
    }

    return (
        <>  
            <Modal
                size="md"
                show={props.deleteBox}
                centered
                onHide={props.closeDeleteBox}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        DELETE POST
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="text-center deleteModal">
                        <Row>
                            <Col>
                                <div className="head">ARE YOU SURE TO DELETE?</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="mr-1" variant="primary" onClick={() => deletePost(props.currentData.key)} >CONFIRM</Button>
                                <Button variant="primary" onClick={props.closeDeleteBox}>CANCEL</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeletePost
