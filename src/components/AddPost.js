import React from 'react';
import fb from './../config/firebase';
import { Modal, Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import useForm from './../utils/useForm';

const AddPost = (props) => {


    const validateForm = (values) => {
        let errors = {};
        if(values.title.trim() === ''){
            errors.title = 'Title is required!'
        }
        if(values.content.trim() === ''){
            errors.content = 'Content is required!'
        }

        return errors;
    }

    const addPost = () => {

        const id = uuidv4();
        const today = new Date().toLocaleString()

        fb.database().ref('posts/' + id).set({
            title: values.title,
            content: values.content,
            author: 'Admin',
            created_at: today
        }).then(
           props.onHide,
        )

    }

    const [values, errors, validated, handleChange, handleSubmit] = useForm(addPost, {title: '', content: ''}, validateForm);

    

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    NEW POST
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" required name="title" value={values.title} onChange={handleChange} />
                        {errors.title && (
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    

                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows="5" required name="content" value={values.content} onChange={handleChange} />
                        {errors.content && (
                            <Form.Control.Feedback type="invalid">
                                {errors.content}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    

                    <Button variant="primary" type="submit">
                        CREATE
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddPost
