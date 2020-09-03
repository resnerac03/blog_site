import React, {useState, useEffect} from 'react'
import fb from './../config/firebase';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import useFormEdit from './../utils/useForm';

const  EditUser = ({currentData, closeEditBox, editBox}) => {
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setTitle(currentData.title);
        setContent(currentData.content);
    },[currentData.title, currentData.content])

    const editPost = (e) => {
        e.preventDefault();

        const id = currentData.key;

        fb.database().ref('posts/' + id).update({
            title: title,
            content: content
        }).then(
           closeEditBox
        )
    }

    return (
        <>  
            <Modal
                size="lg"
                show={editBox}
                centered
                onHide={closeEditBox}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        UPDATE POST
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editPost}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" required name="title" value={title || ''} onChange={ e => setTitle(e.target.value) } />
                        </Form.Group>
                        <Form.Group controlId="company">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows="5" required name="content" value={content || ''} onChange={ e => setContent(e.target.value) } />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            UPDATE
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditUser
